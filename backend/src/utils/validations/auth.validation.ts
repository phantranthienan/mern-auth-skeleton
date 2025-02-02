import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email address'}),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long'})
        .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/.test(value), {
            message: 'Password must contain at least one letter and one number',
        }),
    confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export const loginSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email address'}),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long'})
})