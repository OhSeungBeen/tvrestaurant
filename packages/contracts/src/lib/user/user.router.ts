import { initContract } from '@ts-rest/core';
import { Provider } from '@tvrestaurant/database';
import { z } from 'zod';

const c = initContract();

export const userRouter = c.router({
  getUser: {
    method: 'GET',
    path: '/users/me',
    responses: {
      200: c.type<{
        id: string;
        email: string;
        provider: Provider | 'EMAIL';
        nickName: string;
        thumbnail: string | null;
      }>(),
      401: c.type<{ message: '접근 권한이 없습니다.' }>(),
      404: c.type<{ message: '회원이 존재하지 않습니다.' }>()
    },
    summary: '회원 조회'
  },
  updateUserNickName: {
    method: 'PUT',
    path: '/users/me/nickname',
    body: z.object({
      nickName: z
        .string({
          invalid_type_error: '닉네임은 문자열이어야 합니다',
          required_error: '닉네임을 입력하세요.'
        })
        .max(12, { message: '닉네임 글자수는 최대 12자이내 입니다.' })
        .regex(/^[가-힣a-zA-Z0-9]*$/, {
          message: '닉네임은 공백 또는 특수문자가 포함될 수 없습니다.'
        })
    }),
    responses: {
      200: c.type<{
        nickName: string;
      }>(),
      401: c.type<{ message: '접근 권한이 없습니다.' }>(),
      404: c.type<{ message: '회원이 존재하지 않습니다.' }>()
    },
    summary: '회원 닉네임 수정'
  },
  updateUserThumbnail: {
    method: 'PUT',
    path: '/users/me/thumbnail',
    body: z.object({
      thumbnail: z.string({
        invalid_type_error: '프로필 썸네일 경로는 문자열이어야 합니다',
        required_error: '프로필 썸네일 경로를 입력하세요.'
      })
    }),
    responses: {
      200: c.type<{
        thumbnail: string;
      }>(),
      401: c.type<{ message: '접근 권한이 없습니다.' }>(),
      404: c.type<{ message: '회원이 존재하지 않습니다.' }>()
    },
    summary: '회원 프로필 썸네일 수정'
  }
});
