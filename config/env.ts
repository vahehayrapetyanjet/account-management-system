import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
    NODE_ENV: String,
    TOKEN_SECRET: String,
    TOKEN_TTL: String,
    PORT: Number,
    DB_NAME: String,
    DB_USER: String,
    DB_HOST: String,
    DB_DRIVER: String,
    DB_PASSWORD: String
};

export const env: Env = load(schema);