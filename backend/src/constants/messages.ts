import { INVALID } from "zod";

export const MESSAGES = {
    // Auth messages
    USER_REGISTERED: 'User registered successfully, a verification code has been sent to your email',
    USER_LOGGED_IN: 'Login successful',
    USER_LOGGED_OUT: 'Logout successful',
    USER_VERIFIED: 'User verified successfully',
    EMAIL_ALREADY_REGISTERED: 'Email already registered',
    USER_ALREADY_VERIFIED: 'User is already verified',
    USER_NOT_VERIFIED: 'User is not verified',
    VERIFICATION_CODE_NOT_FOUND: 'Verification code not found',
    VERIFICATOIN_CODE_EXPIRED: 'Verification code expired',
    INVALID_VERIFICATION_CODE: 'Invalid verification code',
    USER_NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'Wrong password',

    //JWT messages
    NEW_TOKEN_GENERATED: 'New access token generated',
    TOKEN_EXPIRED: 'Refresh token expired',
    TOKEN_INVALID: 'Invalid refresh token',
    TOKEN_MISSING: 'Refresh token missing',

    // Validation messages
    VALIDATION_ERROR: 'Invalid request data',

    // Server messages
    INTERNAL_SERVER_ERROR: 'Internal server error',
};
