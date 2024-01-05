import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@app/modules/prisma/prisma.service';

import { Provider } from '@tvrestaurant/database';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async getUserById(id: string): Promise<{
    id: string;
    email: string;
    provider: Provider | 'EMAIL';
    nickName: string;
    thumbnail: string;
  }> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        socialAccount: {
          select: {
            provider: true,
          },
        },
        userProfile: {
          select: {
            nickName: true,
            thumbnail: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('회원이 존재하지 않습니다.');
    }

    return {
      id: user.id,
      email: user.email,
      provider: user.socialAccount.provider || 'EMAIL',
      nickName: user.userProfile.nickName,
      thumbnail: `${this.configService.get('app.cdnUrl')}/${
        user.userProfile.thumbnail
      }`,
    };
  }

  async updateNickName({
    userId,
    nickName,
  }: {
    userId: string;
    nickName: string;
  }): Promise<string> {
    const updatedUserProfile = await this.prismaService.userProfile.update({
      data: {
        nickName,
      },
      where: {
        userId,
      },
    });

    return updatedUserProfile.nickName;
  }

  async updateUserThumbnail({
    userId,
    thumbnail,
  }: {
    userId: string;
    thumbnail: string;
  }): Promise<string> {
    const updatedUserProfile = await this.prismaService.userProfile.update({
      data: {
        thumbnail,
      },
      where: {
        userId,
      },
    });

    return updatedUserProfile.thumbnail;
  }
}
