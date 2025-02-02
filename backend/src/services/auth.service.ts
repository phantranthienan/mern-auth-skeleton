import { User } from '../models/user.model';
import { ConflictError, NotFoundError, UnauthorizedError } from '@/errors/api.errors';
import { JsonWebTokenError } from 'jsonwebtoken';

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/utils/jwt.util';
import { hashPassword, comparePassword } from '@/utils/bcrypt.util';

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

    // create new user
    const newUser = new User({ 
        email, 
        username,
        password: hashedPassword 
    });
    await newUser.save();

    const userObject = newUser.toObject();

    return userObject;
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
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