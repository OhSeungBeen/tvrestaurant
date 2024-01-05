import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { v4 as generateUuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  constructor(private configService: ConfigService) {
    const aws = this.configService.get('aws');
    this.s3Client = new S3Client({
      region: aws.region,
      credentials: {
        accessKeyId: aws.s3AccessKey,
        secretAccessKey: aws.s3SecretAccessKey,
      },
    });
  }

  async getSignedUrl({
    path,
    objectName,
    contentType,
  }: {
    path: string;
    objectName: string;
    contentType: string;
  }) {
    const fileExtension = objectName.split('.').pop();
    const fileName = `${generateUuid()}.${fileExtension}`;
    const fileKey = `${path}/${fileName}`;

    const signedUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.configService.get('aws.bucketName'),
        Key: fileKey,
        ContentType: contentType,
        ACL: 'private',
      }),
      {
        expiresIn: 3600,
      },
    );
    return {
      signedUrl,
      fileName,
      fileKey,
      publicUrl: signedUrl.split('?').shift(),
    };
  }
}
