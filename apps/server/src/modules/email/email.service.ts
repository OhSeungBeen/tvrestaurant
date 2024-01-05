import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as shortId from 'shortid';

import { PrismaService } from '@app/modules/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailLoginCode(to: string): Promise<boolean> {
    const clientUrl = this.configService.get('app.clientUrl');
    const code = shortId.generate();
    await this.prismaService.emailAuth.create({ data: { email: to, code } });

    try {
      await this.mailerService.sendMail({
        to,
        subject: '티비레스토랑 로그인',
        template: 'login.ejs',
        context: {
          redirectUrl: `${clientUrl}/auth/email-code-verify/${code}`,
        },
      });
    } catch (e) {
      return false;
    }

    return true;
  }
}
