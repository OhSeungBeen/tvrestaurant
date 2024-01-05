import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as shortId from 'shortid';

import { PrismaService } from '@app/modules/prisma/prisma.service';

import { Provider } from '@tvrestaurant/database';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(id: string) {
    return this.jwtService.sign(
      {
        sub: id,
      },
      {
        secret: this.configService.get('jwt.secret'),
        expiresIn: 1000 * 60 * 60,
        issuer: this.configService.get('app.host'),
      },
    );
  }

  generateJwtRefreshToken(id: string) {
    return this.jwtService.sign(
      { sub: id },
      {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: 1000 * 60 * 60 * 24 * 30,
        issuer: this.configService.get('app.host'),
      },
    );
  }

  async getTokenByCode(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const emailAuth = await this.prismaService.emailAuth.findUnique({
      where: { code },
    });

    if (!emailAuth) {
      throw new NotFoundException('로그인 코드가 존재하지 않습니다.');
    }

    if (emailAuth.logged) {
      throw new ForbiddenException('이미 사용한 로그인 코드입니다.');
    }

    const user = await this.prismaService.user.upsert({
      where: { email: emailAuth.email },
      update: {},
      create: {
        userProfile: {
          create: {
            nickName: `회원${code}`,
          },
        },
        email: emailAuth.email,
      },
    });

    await this.prismaService.emailAuth.update({
      data: {
        logged: true,
      },
      where: {
        code,
      },
    });

    return {
      accessToken: this.generateJwtToken(user.id),
      refreshToken: this.generateJwtRefreshToken(user.id),
    };
  }

  async getTokenBySocial({
    id,
    provider,
    email,
  }: {
    id: string;
    provider: Provider;
    email: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { user } = await this.prismaService.socialAccount.upsert({
      where: {
        socialId_provider: {
          socialId: id,
          provider,
        },
      },
      update: {},
      create: {
        socialId: id,
        provider,
        user: {
          connectOrCreate: {
            where: { email },
            create: {
              userProfile: {
                create: {
                  nickName: `회원${shortId.generate()}`,
                },
              },
              email,
            },
          },
        },
      },
      include: {
        user: true,
      },
    });

    return {
      accessToken: this.generateJwtToken(user.id),
      refreshToken: this.generateJwtRefreshToken(user.id),
    };
  }
}
