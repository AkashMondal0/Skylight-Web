import dotenv from 'dotenv';
dotenv.config();

const _config = {
    app: {
        port: process.env.PORT || 4000,
        name: process.env.APPNAME || 'sky-media',
        version: process.env.APPVERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    },
    database: {
        redis: process.env.REDIS_URL,
        PostgresqlUrl: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    kinde: {
        issuerUrl: process.env.KINDE_ISSUER_URL,
        clientId: process.env.KINDE_CLIENT_ID,
        clientSecret: process.env.KINDE_CLIENT_SECRET,
        siteUrl: process.env.KINDE_SITE_URL,
        postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL
    }

}

export const config = Object.freeze(_config);