import { transporter } from "@/config/nodemailer.config";
import { forgotPasswordEmailTemplate, verificationOtpEmailTemplate } from "@/utils/mail-templates";

/**
 * Sends a verification OTP email to the specified recipient.
 * @param to - The recipient's email address.
 * @param otp - The OTP to be sent in the email.
 */
export const sendVerificationOtpEmail = async (to: string, otp: string) => {
    const mailOptions = verificationOtpEmailTemplate(to, otp);
    await transporter.sendMail(mailOptions);
};

/**
 * Sends a forgot password email to the specified recipient.
 * @param to - The recipient's email address.
 * @param resetLink - The reset link to be sent in the email.
 */
export const sendForgotPasswordEmail = async (to: string, resetLink: string) => {
    const mailOptions = forgotPasswordEmailTemplate(to, resetLink);
    await transporter.sendMail(mailOptions);
};