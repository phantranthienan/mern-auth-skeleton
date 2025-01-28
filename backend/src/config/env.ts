import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_UR,
    CORS_ORIGIN: (process.env.CORS_ORIGIN || '').split(','),
}

const requiredVariables = ['MONGO_URI'];
requiredVariables.forEach((variable) => {
    if (!ENV[variable as keyof typeof ENV]) {
        console.error(`Missing required env variable ${variable}`);
        process.exit(1);
    }
});