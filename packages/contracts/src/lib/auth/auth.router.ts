import { ZodIssue, z } from 'zod';

import { initContract } from '@ts-rest/core';

const c = initContract();

export const authRouter = c.router({
  sendEmailLoginCode: {
    method: 'POST',
    path: '/auth/email-login-code-send',
    body: z.object({
      email: z
        .string({
          invalid_type_error: '이메일은 문자열이어야 합니다.',
          required_error: '이메일을 입력하세요.'
        })
        .email({ message: '올바른 이메일 형식을 입력하세요.' })
    }),
    responses: {
      204: null,
      400: c.type<{
        message: '요청 유효성 검사 오류입니다.';
        error: { body: ZodIssue };
      }>()
    },
    summary: '이메일 로그인 코드 전송'
  },
  loginByEmail: {
    method: 'POST',
    path: '/auth/email-login',
    body: z.object({
      code: z.string({
        invalid_type_error: '이메일 코드값은 문자열이어야 합니다.',
        required_error: '이메일 코드값을 입력하세요.'
      })
    }),
    responses: {
      200: c.type<{
        accessToken: string;
        refreshToken: string;
      }>(),
      400: c.type<{
        message: '요청 유효성 검사 오류입니다.';
        error: { body: ZodIssue };
      }>(),
      403: c.type<{ message: '이미 사용한 로그인 코드입니다.' }>(),
      404: c.type<{ message: '로그인 코드가 존재하지 않습니다.' }>()
    },
    summary: '이메일 로그인'
  },
  loginByKakao: {
    method: 'GET',
    path: '/auth/kakao-login',
    responses: {
      204: null
    },
    summary: '카카오 로그인'
  },
  loginByKakaoRedirect: {
    method: 'GET',
    path: '/auth/kakao-login/redirect',
    responses: {
      302: null
    },
    summary: '카카오 로그인 리다이렉트'
  },
  loginByNaver: {
    method: 'GET',
    path: '/auth/naver-login',
    responses: {
      204: null
    },
    summary: '네이버 로그인'
  },
  loginByNaverRedirect: {
    method: 'GET',
    path: '/auth/naver-login/redirect',
    responses: {
      302: null
    },
    summary: '네이버 로그인 리다이렉트'
  },
  loginByGoogle: {
    method: 'GET',
    path: '/auth/google-login',
    responses: {
      204: null
    },
    summary: '구글 로그인'
  },
  loginByGoogleRedirect: {
    method: 'GET',
    path: '/auth/google-login/redirect',
    responses: {
      302: null
    },
    summary: '구글 로그인 리다이렉트'
  },
  refresh: {
    method: 'GET',
    path: '/auth/refresh',
    responses: {
      200: c.type<{
        accessToken: string;
      }>(),
      404: c.type<{ message: '회원이 존재하지 않습니다.' }>()
    }
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    body: null,
    responses: {
      204: null
    },
    summary: '로그아웃'
  }
});
