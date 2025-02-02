import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { ApiError } from '@/errors/api.errors'
import { ApiResponse } from '@/types/responses/response.types';
import { errorResponse } from '@/utils/response.util';
import { MESSAGES } from '@/constants/messages';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response<ApiResponse<null>>, 
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        const errors = err.errors.map((error) => {
            return {
                path: error.path.join('.'),
                message: error.message,
            };
        });
        res.status(400).json(errorResponse(MESSAGES.VALIDATION_ERROR, errors));
    }

    if (err instanceof ApiError) {
        res.status(err.statusCode).json(errorResponse(err.message));
    }

    console.error('❌ Unexpected Error:', err);
    res.status(500).json(errorResponse(MESSAGES.INTERNAL_SERVER_ERROR));
};