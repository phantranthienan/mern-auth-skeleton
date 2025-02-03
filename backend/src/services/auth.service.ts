import { User } from '../models/user.model';
import { ConflictError, NotFoundError, UnauthorizedError, BadRequestError } from '@/errors/api.errors';
import { JsonWebTokenError } from 'jsonwebtoken';

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/utils/jwt.util';
import { hashPassword, comparePassword } from '@/utils/bcrypt.util';
import { sendVerificationOtpEmail } from '@/utils/nodemailer.util';
import { generateOTP } from '@/utils/otp.util';

import { MESSAGES } from '@/constants/messages';

export const registerUser = async (email: string, password: string) => {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ConflictError(MESSAGES.EMAIL_ALREADY_REGISTERED);
    }

    // set username
    const username = email.split('@')[0];

    // hash password
    const hashedPassword = await hashPassword(password);

    // Generate a 6-digit OTP and set expiration for 24 hours from now
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // create new user
    const newUser = new User({ 
        email, 
        username,
        password: hashedPassword, 
        isVerified: false,
        verificationCode: otp,
        verificationCodeExpiresAt: otpExpiresAt,
    });
    await newUser.save();

    // send verification email
    await sendVerificationOtpEmail(email, otp);

    const userObject = newUser.toObject();

    return userObject;
};

export const verifyUserOtp = async (email: string, otp: string) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
    }
    if (user.isVerified) {
        throw new BadRequestError(MESSAGES.USER_ALREADY_VERIFIED);
    }
    if (!user.verificationCode || !user.verificationCodeExpiresAt) {
        throw new NotFoundError(MESSAGES.VERIFICATION_CODE_NOT_FOUND);
    }
    if (user.verificationCode !== otp) {
        throw new BadRequestError(MESSAGES.INVALID_VERIFICATION_CODE);
    }
    if (new Date() > user.verificationCodeExpiresAt) {
        throw new BadRequestError(MESSAGES.VERIFICATOIN_CODE_EXPIRED);
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;
    await user.save();
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
    }
    if (!user.isVerified) {
        throw new UnauthorizedError(MESSAGES.USER_NOT_VERIFIED);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new UnauthorizedError(MESSAGES.WRONG_PASSWORD);
    }

    const userObject = user.toObject();

    const payload = { userId: userObject._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new UnauthorizedError(MESSAGES.TOKEN_MISSING);
    }

    try {
        const decodedRefreshToken = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken({ userId: decodedRefreshToken.userId });
        return newAccessToken;
    } catch (error: unknown) {
        if (error instanceof JsonWebTokenError) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError(MESSAGES.TOKEN_EXPIRED);
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedError(MESSAGES.TOKEN_INVALID);
            }
        }
        throw error;
    }
};