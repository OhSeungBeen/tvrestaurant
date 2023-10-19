import { z } from 'zod';

const environment = z.enum(['development', 'production']);
type Envrionment = z.infer<typeof environment>;

const appEnv = (process.env.NODE_ENV as Envrionment) || 'development';

const envSchema = z.object({
  appEnv: environment,
  apiUrl: z.string(),
});

export const env = envSchema.parse({
  appEnv,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
});
