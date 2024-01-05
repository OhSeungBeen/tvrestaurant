import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.EMAIL_HOST,
  user: process.env.EMAIL_USER,
  secret: process.env.EMAIL_SECRET,
}));
