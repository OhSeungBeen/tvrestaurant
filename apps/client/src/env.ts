import { z } from 'zod';

const environment = z.enum(['development', 'production']);
type Environment = z.infer<typeof environment>;

const appEnv = (process.env.NODE_ENV as Environment) || 'development';

const envSchema = z.object({
  appEnv: environment,
  apiHost: z.string(),
});

export const env = envSchema.parse({
  appEnv,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
});
