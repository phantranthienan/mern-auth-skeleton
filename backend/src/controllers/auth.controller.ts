import { Request, Response } from 'express';
import { registerUser } from '@/services/auth.service';
import { successResponse } from '@/utils/response.util';

import { MESSAGES } from '@/constants/messages';
import { ApiResponse } from '@/types/responses/response.types';
import { RegisterRequestBody } from '@/types/requests/auth.requests';
import { RegisterResponseData } from '@/types/responses/auth.responses';

export const registerController = async (
    req: Request<{},{},RegisterRequestBody>, 
    res: Response<ApiResponse<RegisterResponseData>>
) => {
    const { email, password } = req.body;
    const newUser = await registerUser(email, password);

    const response = successResponse<RegisterResponseData>(MESSAGES.USER_REGISTERED, {
        ...newUser,
        _id: newUser._id.toString(),
    });

    res.status(201).json(response);
};

export const loginController = async (req: Request, res: Response) => {
    res.send('Login');
}


export const logoutController = async (req: Request, res: Response) => {
    res.send('Logout');
}