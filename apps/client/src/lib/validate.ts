import { z } from 'zod';

const emailSchema = z.string().email();

export function validateEmail(email: string) {
  try {
    emailSchema.parse(email);
    return true;
  } catch (error) {
    return false;
  }
}
