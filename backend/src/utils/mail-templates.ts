import { ENV } from '@/config/env';

/**
 * Generates the email options for an OTP verification email.
 * @param to - The recipient's email address.
 * @param otp - The 6-digit OTP code.
 * @returns An object containing the mail options.
 */
export const verificationOtpEmailTemplate = (to: string, otp: string) => {
    return {
        from: ENV.GMAIL_USER,
        to,
        subject: 'Your Email Verification Code',
        text: `Your verification code is ${otp}. This code will expire in 24 hours.`,
        html: `<p>Your verification code is <strong>${otp}</strong>.</p>
               <p>This code will expire in 24 hours.</p>`
    };
  };

/**
 * Generates the email options for a forgot password email.
 * @param to - The recipient's email address.
 * @param resetLink - The link the user must click to reset their password.
 * @returns An object containing the mail options.
 */
export const forgotPasswordEmailTemplate = (to: string, resetLink: string) => {
    return {
        from: ENV.GMAIL_USER,
        to,
        subject: 'Password Reset Request',
        text: `You have requested to reset your password. Please click the link below to reset your password. If you did not request a password reset, please ignore this email.\n\n${resetLink}`,
        html: `<p>You have requested to reset your password.</p>
               <p>Please click the link below to reset your password:</p>
               <p><a href="${resetLink}">Reset Password</a></p>
               <p>If you did not request a password reset, please ignore this email.</p>`
    };
};
