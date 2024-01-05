import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV,
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 10),
  url: process.env.APP_URL,
  clientHost: process.env.APP_CLIENT_HOST,
  clientPort: parseInt(process.env.APP_CLIENT_PORT, 10),
  clientUrl: process.env.APP_CLIENT_URL,
  cdnUrl: process.env.APP_CDN_URL,
}));
