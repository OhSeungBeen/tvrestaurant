import { Controller, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@app/modules/auth/auth.service';
import { GoogleAuthGuard } from '@app/modules/auth/guards/google.guards';
import { JwtRefreshAuthGuard } from '@app/modules/auth/guards/jwt-refresh.guards';
import { KakaoAuthGuard } from '@app/modules/auth/guards/kakao.guards';
import { NaverAuthGuard } from '@app/modules/auth/guards/naver.guards';
import { EmailService } from '@app/modules/email/email.service';
import {
  resetTokensCookie,
  setAccessTokenCookie,
  setTokensCookie,
} from '@app/utils/token';

import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { router } from '@tvrestaurant/contracts';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  @TsRestHandler(router.auth.sendEmailLoginCode)
  async sendEmailLoginCode() {
    return tsRestHandler(
      router.auth.sendEmailLoginCode,
      async ({ body: { email } }) => {
        const isSuccess = await this.emailService.sendEmailLoginCode(email);
        if (isSuccess) {
          return {
            status: HttpStatus.NO_CONTENT,
            body: null,
          };
        }
        return {
          status: HttpStatus.NO_CONTENT,
          body: null,
        };
      },
    );
  }

  @TsRestHandler(router.auth.loginByEmail)
  async loginByEmail(@Res() res) {
    return tsRestHandler(
      router.auth.loginByEmail,
      async ({ body: { code } }) => {
        const token = await this.authService.getTokenByCode(code);
        setTokensCookie(res, token);
        return res.status(HttpStatus.OK).send(token);
      },
    );
  }

  @UseGuards(KakaoAuthGuard)
  @TsRestHandler(router.auth.loginByKakao)
  async loginByKakao() {
    return tsRestHandler(router.auth.loginByKakao, async () => {
      return {
        status: HttpStatus.NO_CONTENT,
        body: null,
      };
    });
  }

  @UseGuards(KakaoAuthGuard)
  @TsRestHandler(router.auth.loginByKakaoRedirect)
  async loginByKakaoRedirect(@Req() req, @Res() res) {
    return tsRestHandler(router.auth.loginByKakaoRedirect, async () => {
      const { id, email } = req.user;
      const token = await this.authService.getTokenBySocial({
        id,
        provider: 'KAKAO',
        email,
      });
      setTokensCookie(res, token);
      res.redirect(this.configService.get<string>('app.clientUrl'));
      return {
        status: HttpStatus.FOUND,
        body: null,
      };
    });
  }

  @UseGuards(NaverAuthGuard)
  @TsRestHandler(router.auth.loginByNaver)
  async loginByNaver() {
    return tsRestHandler(router.auth.loginByNaver, async () => {
      return {
        status: HttpStatus.NO_CONTENT,
        body: null,
      };
    });
  }

  @UseGuards(NaverAuthGuard)
  @TsRestHandler(router.auth.loginByNaverRedirect)
  async loginByNaverRedirect(@Req() req, @Res() res) {
    return tsRestHandler(router.auth.loginByNaverRedirect, async () => {
      const { id, email } = req.user;
      const token = await this.authService.getTokenBySocial({
        id,
        provider: 'NAVER',
        email,
      });
      setTokensCookie(res, token);
      res.redirect(this.configService.get<string>('app.clientUrl'));
      return {
        status: HttpStatus.FOUND,
        body: null,
      };
    });
  }

  @UseGuards(GoogleAuthGuard)
  @TsRestHandler(router.auth.loginByGoogle)
  async loginByGoogle() {
    return tsRestHandler(router.auth.loginByGoogle, async () => {
      return {
        status: HttpStatus.NO_CONTENT,
        body: null,
      };
    });
  }

  @UseGuards(GoogleAuthGuard)
  @TsRestHandler(router.auth.loginByGoogleRedirect)
  async loginByGoogleRedirect(@Req() req, @Res() res) {
    return tsRestHandler(router.auth.loginByGoogleRedirect, async () => {
      const { id, email } = req.user;
      const token = await this.authService.getTokenBySocial({
        id,
        provider: 'GOOGLE',
        email,
      });
      setTokensCookie(res, token);
      res.redirect(this.configService.get<string>('app.clientUrl'));
      return {
        status: HttpStatus.FOUND,
        body: null,
      };
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @TsRestHandler(router.auth.refresh)
  async refresh(@Req() req, @Res() res) {
    return tsRestHandler(router.auth.refresh, async () => {
      const accessToken = await this.authService.generateJwtToken(req.user.id);
      setAccessTokenCookie(res, accessToken);
      return res.status(HttpStatus.OK).send({ accessToken });
    });
  }

  @TsRestHandler(router.auth.logout)
  async logout(@Res() res) {
    return tsRestHandler(router.auth.logout, async () => {
      resetTokensCookie(res);
      return res.status(HttpStatus.NO_CONTENT).send();
    });
  }
}
