import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

import { router } from '@tvrestaurant/contracts';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(protected configService: ConfigService) {
    super({
      clientID: configService.get<string>('social.kakaoClientId'),
      callbackURL: `${configService.get<string>('app.url')}${
        router.auth.loginByKakaoRedirect.path
      }`,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    const user = {
      id: profileJson.id.toString(),
      email:
        kakao_account.has_email && !kakao_account.email_needs_agreement
          ? kakao_account.email
          : null,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
