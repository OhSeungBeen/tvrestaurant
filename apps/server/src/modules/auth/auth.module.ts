import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';
import { GoogleStrategy } from '@app/modules/auth/strategies/google.strategy';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { KakaoStrategy } from '@app/modules/auth/strategies/kakao.strategy';
import { NaverStrategy } from '@app/modules/auth/strategies/naver.strategy';
import { EmailModule } from '@app/modules/email/email.module';
import { UserService } from '@app/modules/user/user.service';
import { JwtRefreshStrategy } from '@app/modules/auth/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    EmailModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    JwtRefreshStrategy,
    KakaoStrategy,
    GoogleStrategy,
    NaverStrategy,
  ],
})
export class AuthModule {}
