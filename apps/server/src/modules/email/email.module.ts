import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';

import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const email = configService.get('email');
        return {
          transport: `smtps://${email.user}:${email.secret}@${email.host}`,
          default: {
            from: `"티비레스토랑" ${email.user}`,
          },
          secure: false,
          template: {
            dir: path.join(__dirname, 'modules/email/templates/'),
            adapter: new EjsAdapter(undefined),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
