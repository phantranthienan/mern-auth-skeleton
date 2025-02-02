// Type definitions for responses related to authentication

import { ObjectId } from "mongoose";

export interface RegisterResponseData {
    _id: string,
    email: string,
    username: string,
}

export interface LoginResponseData {
    accessToken: string,
}

export interface RefreshTokenResponseData {
    accessToken: string,
}