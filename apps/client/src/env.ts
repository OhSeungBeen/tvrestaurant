import { z } from 'zod';

const environment = z.enum(['development', 'production']);
type Environment = z.infer<typeof environment>;

const appEnv = (process.env.NODE_ENV as Environment) || 'development';

const envSchema = z.object({
  appEnv: environment,
  appHost: z.string(),
  appPort: z.number(),
  appUrl: z.string(),
  appServerHost: z.string(),
  appServerPort: z.number(),
  appServerUrl: z.string(),
  kakaoApiKey: z.string(),
});

export const env = envSchema.parse({
  appEnv,
  appHost: process.env.NEXT_PUBLIC_APP_HOST,
  appPort: parseInt(process.env.NEXT_PUBLIC_APP_PORT, 10),
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  appServerHost: process.env.NEXT_PUBLIC_APP_SERVER_HOST,
  appServerPort: parseInt(process.env.NEXT_PUBLIC_APP_SERVER_PORT, 10),
  appServerUrl: process.env.NEXT_PUBLIC_APP_SERVER_URL,
  kakaoApiKey: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
});
