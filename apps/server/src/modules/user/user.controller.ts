import { Controller, HttpStatus, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@app/modules/auth/guards/jwt.guards';
import { UserService } from '@app/modules/user/user.service';

import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { router } from '@tvrestaurant/contracts';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(router.user.getUser)
  async getUser(@Req() req) {
    return tsRestHandler(router.user.getUser, async () => {
      return {
        status: HttpStatus.OK,
        body: req.user,
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(router.user.updateUserNickName)
  async updateUserNickName(@Req() req) {
    return tsRestHandler(
      router.user.updateUserNickName,
      async ({ body: { nickName } }) => {
        const updatedNickName = await this.userService.updateNickName({
          userId: req.user.id,
          nickName,
        });
        return {
          status: HttpStatus.OK,
          body: {
            nickName: updatedNickName,
          },
        };
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(router.user.updateUserThumbnail)
  async updateUserProfileThumbnail(@Req() req) {
    return tsRestHandler(
      router.user.updateUserThumbnail,
      async ({ body: { thumbnail } }) => {
        const updatedThumbnail = await this.userService.updateUserThumbnail({
          userId: req.user.id,
          thumbnail,
        });
        return {
          status: HttpStatus.OK,
          body: {
            thumbnail: updatedThumbnail,
          },
        };
      },
    );
  }
}
