import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@app/modules/user/user.service';

import { Provider, User } from '@tvrestaurant/database';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          let accessToken;

          try {
            // SSR
            accessToken = JSON.parse(request.headers.cookie)['access_token'];
          } catch (error) {
            // CSR
            accessToken = request.cookies['access_token'];
          }

          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub);

    return user;
  }
}
