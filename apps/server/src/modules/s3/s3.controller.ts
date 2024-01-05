import { Controller, HttpStatus, Req, UseGuards } from '@nestjs/common';

import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { router } from '@tvrestaurant/contracts';

import { S3Service } from '@app/modules/s3/s3.service';

@Controller()
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @TsRestHandler(router.s3.getSignUrl)
  async getSignUrl() {
    return tsRestHandler(
      router.s3.getSignUrl,
      async ({ query: { path, objectName, contentType } }) => {
        return {
          status: HttpStatus.OK,
          body: await this.s3Service.getSignedUrl({
            path,
            objectName,
            contentType,
          }),
        };
      },
    );
  }
}
