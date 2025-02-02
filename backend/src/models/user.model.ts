import { Schema, InferSchemaType, HydratedDocument, model } from 'mongoose';

const userSchema = new Schema({
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

const transformFunction = (_: any, ret: any) => {
    delete ret.__v;
    delete ret.password;
    // delete ret.resetPasswordToken;
    // delete ret.resetPasswordExpiresAt;
    // delete ret.verificationToken;
    // delete ret.verificationTokenExpiresAt;
};
  
userSchema.set('toObject', { transform: transformFunction });
userSchema.set('toJSON', { transform: transformFunction });

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserType>;

export const User = model<UserDocument>('User', userSchema);