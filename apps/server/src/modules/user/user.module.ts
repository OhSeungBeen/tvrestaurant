import { Module } from '@nestjs/common';

import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { UserController } from '@app/modules/user/user.controller';
import { UserService } from '@app/modules/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
