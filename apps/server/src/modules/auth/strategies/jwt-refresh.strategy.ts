import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@app/modules/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    protected configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          let refreshToken;

          try {
            // SSR
            refreshToken = JSON.parse(request.headers.cookie)['refresh_token'];
          } catch (error) {
            // CSR
            refreshToken = request.cookies['refresh_token'];
          }

          return refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(request, payload: any) {
    const user = await this.userService.getUserById(payload.sub);

    return user;
  }
}
