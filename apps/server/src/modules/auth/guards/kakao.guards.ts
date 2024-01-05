import { AuthGuard } from '@nestjs/passport';

export class KakaoAuthGuard extends AuthGuard('kakao') {}
