import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '@app/config/app/app.config';
import { validationSchema } from '@app/config/validationSchema';
import { PrismaModule } from '@app/modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig],
      validationSchema,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
