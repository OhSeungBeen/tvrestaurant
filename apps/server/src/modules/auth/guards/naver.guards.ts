import { AuthGuard } from '@nestjs/passport';

export class NaverAuthGuard extends AuthGuard('naver') {}
