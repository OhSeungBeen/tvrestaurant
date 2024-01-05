import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION,
  bucketName: process.env.AWS_BUCKET_NAME,
  s3AccessKey: process.env.AWS_S3_ACCESS_KEY,
  s3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
}));
