import { registerAs } from '@nestjs/config';

export default registerAs('social', () => ({
  kakaoClientId: process.env.KAKAO_CLIENT_ID,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  naverClientId: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET,
}));
