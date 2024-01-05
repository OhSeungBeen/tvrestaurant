import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionFilter } from '@app/common/filters/all-exceptions.filter';
import appConfig from '@app/config/app/app.config';
import awsConfig from '@app/config/aws/aws.config';
import gmailConfig from '@app/config/email/email.config';
import jwtConfig from '@app/config/jwt/jwt.config';
import socialConfig from '@app/config/social/social.config';
import { validationSchema } from '@app/config/validation-schema';
import { AuthModule } from '@app/modules/auth/auth.module';
import { PrismaModule } from '@app/modules/prisma/prisma.module';
import { S3Module } from '@app/modules/s3/s3.module';
import { UserModule } from '@app/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig, gmailConfig, jwtConfig, socialConfig, awsConfig],
      validationSchema,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    S3Module,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
