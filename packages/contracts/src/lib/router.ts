import { initContract } from '@ts-rest/core';
import { authRouter } from './auth/auth.router';
import { z, ZodIssue } from 'zod';
import { userRouter } from './user/user.router';
import { s3Router } from './s3/s3.router';

const c = initContract();

export const router = c.router(
  {
    auth: authRouter,
    user: userRouter,
    s3: s3Router
  },
  {
    pathPrefix: '/api/v1',
    strictStatusCodes: true,
    validateResponseOnClient: true
  }
);
