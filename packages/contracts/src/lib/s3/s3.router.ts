import { ZodIssue, z } from 'zod';

import { initContract } from '@ts-rest/core';

const c = initContract();

export const s3Router = c.router({
  getSignUrl: {
    method: 'GET',
    path: '/s3/sign-url',
    query: z.object({
      objectName: z.string({
        invalid_type_error: '파일이름은 문자열이어야 합니다.',
        required_error: '파일이름을 입력하세요.'
      }),
      contentType: z.string({
        invalid_type_error: '파일형식은 문자열이어야 합니다.',
        required_error: '파일형식을 입력하세요.'
      }),
      path: z.string({
        invalid_type_error: '파일경로는 문자열이어야 합니다.',
        required_error: '파일경로를 입력하세요.'
      })
    }),
    responses: {
      200: c.type<{
        signedUrl: string;
        fileName: string;
        fileKey: string;
        publicUrl: string;
      }>(),
      400: c.type<{
        message: '요청 유효성 검사 오류입니다.';
        error: { query: ZodIssue };
      }>()
    },
    summary: 'AWS S3 서명된 URL 조회'
  }
});
