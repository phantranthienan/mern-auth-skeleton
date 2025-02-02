import { Schema, HydratedDocument, model } from 'mongoose';

// Types definition
export interface UserInterface {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    // resetPasswordToken: string;
    // resetPasswordExpiresAt: Date;
    // verificationToken: string;
    // verificationTokenExpiresAt: Date;
} 

// UserDocument to work with mongoose
export type UserDocument = HydratedDocument<UserInterface>;

const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    // resetPasswordToken: String,
    // resetPasswordExpiresAt: Date,
    // verificationToken: String,
    // verificationTokenExpiresAt: Date,
});

userSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
        delete ret.password;
        // delete ret.resetPasswordToken;
        // delete ret.resetPasswordExpiresAt;
        // delete ret.verificationToken;
        // delete ret.verificationTokenExpiresAt;
    },
});

export const User = model<UserInterface>('User', userSchema);


// HELPER FUNCTIONS

export const createUser = async (userData: Partial<UserInterface>): Promise<UserDocument> => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error(error);
        throw new Error(`Error creating user: ${error}`);
    }
};

export const findUserById = async (id: string): Promise<UserDocument | null> => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error(error);
        throw new Error(`Error finding user by id: ${error}`);
    }
};

export const findUserByEmail = async (email: string) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error(error);
        throw new Error(`Error finding user by email: ${error}`);
    }
};