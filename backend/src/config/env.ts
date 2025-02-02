import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    CORS_ORIGIN: (process.env.CORS_ORIGIN || '').split(','),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
}

const requiredVariables = ['MONGO_URI', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
requiredVariables.forEach((variable) => {
    if (!ENV[variable as keyof typeof ENV]) {
        console.error(`Missing required env variable ${variable}`);
        process.exit(1);
    }
});