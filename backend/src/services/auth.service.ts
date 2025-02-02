import { User } from '../models/user.model';
import { ConflictError, NotFoundError, UnauthorizedError } from '@/errors/api-error';
import { hashPassword, comparePassword } from '@/utils/bcrypt.util';

export const registerUser = async (email: string, password: string) => {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ConflictError('Email already registered');
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
        throw new NotFoundError('User not found');
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        throw new UnauthorizedError('Wrong password');
    }

    return user;
};