import { z } from 'zod';

const envSchema = z.object({
    VITE_API: z.string().url(),
    VITE_ENABLE_API_DELAY: z
        .string()
        .transform((value) => value === 'true'),
});

export const env = envSchema.parse({
    VITE_API: import.meta.env.VITE_API,
    VITE_ENABLE_API_DELAY: import.meta.env.VITE_ENABLE_API_DELAY,
});
