import express from 'express';
import { validateRequest } from '@/middlewares/validation.middleware';
import { registerSchema, loginSchema } from '@/utils/validations/auth.validation';
import { registerController, loginController, logoutController } from '@/controllers/auth.controller';

const router = express.Router();

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
 *         description: User registered successfully.
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
 *                   example: "User registered successfully"
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
router.post('/register', validateRequest(registerSchema), registerController);


router.post('/login', validateRequest(loginSchema), loginController);

router.post('/logout', logoutController);

export default router;