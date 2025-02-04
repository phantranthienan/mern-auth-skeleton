import express from 'express';
import { validateRequest } from '@/middlewares/validation.middleware';
import { registerSchema, loginSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema } from '@/utils/validations/auth.validation';
import { registerController, loginController, logoutController, refreshTokenController, verifyUserController, forgotPasswordController, resetPasswordController } from '@/controllers/auth.controller';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerController);

router.post('/verify-user', validateRequest(verifyUserSchema), verifyUserController); 

router.post('/login', validateRequest(loginSchema), loginController);

router.post('/logout', logoutController);

router.post('/refresh-token', refreshTokenController);

router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordController);

router.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordController);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confirmPassword:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully, a verification code will be sent to provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully, a verification code has been sent to your email"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60bbf824f72e8e3a69cb3d1a"
 *                     username:
 *                       type: string
 *                       example: "user"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Validation error. The response will contain an array of error details indicating which fields failed validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: "email"
 *                       message:
 *                         type: string
 *                         example: "Invalid email address"
 *       409:
 *         description: Email already registered.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/verify-user:
 *   post:
 *     summary: Verify user email
 *     description: Verifies a user's email by checking the 6-digit OTP provided in the request body. The OTP expires in 24 hours.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User verified successfully"
 *       400:
 *         description: Invalid or expired verification code or user already verified.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns an access token. The refresh token is stored in an HttpOnly cookie.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "jwt_access_token_here"
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Wrong password or user not verified.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */ 

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the user
 *     description: Logs out the user by clearing the refresh token cookie.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token using the refresh token stored in an HttpOnly cookie.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "New access token generated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "new_jwt_access_token_here"
 *       401:
 *         description: Refresh token missing or invalid or expired.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Initiate password reset
 *     description: Sends a password reset link to the specified email if it exists.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset link sent.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using the reset token sent via email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               token:
 *                 type: string
 *                 example: "reset_token_here"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               confirmNewPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Validation error or token mismatch/expired.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
export default router;