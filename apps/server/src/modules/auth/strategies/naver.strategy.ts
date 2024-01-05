import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

import { router } from '@tvrestaurant/contracts';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(protected configService: ConfigService) {
    super({
      clientID: configService.get<string>('social.naverClientId'),
      clientSecret: configService.get<string>('social.naverClientSecret'),
      callbackURL: `${configService.get<string>('app.url')}${
        router.auth.loginByNaverRedirect.path
      }`,
    });
  }

  async validate(
    accessToken,
    refreshToken,
    profile: any,
    done: any,
  ): Promise<any> {
    const user = {
      id: profile.id,
      email: profile.email,
      accessToken,
      refreshToken,
    };
    return done(null, user);
  }
}
