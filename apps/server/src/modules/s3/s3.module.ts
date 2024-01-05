import { Module } from '@nestjs/common';

import { S3Controller } from '@app/modules/s3/s3.controller';
import { S3Service } from '@app/modules/s3/s3.service';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
