// Type definitions for requests related to authentication

export interface RegisterRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface VerifyUserRequestBody {
    email: string;
    otp: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}