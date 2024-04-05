import { GrantType, setupKinde } from "@kinde-oss/kinde-node-express";
import { Express } from "express";
import dotEnv from "dotenv";
dotEnv.config();

const config = {
    clientId: process.env.KINDE_CLIENT_ID as string,
    issuerBaseUrl: process.env.KINDE_ISSUER_URL as string,
    siteUrl: process.env.KINDE_SITE_URL as string,
    secret: process.env.KINDE_CLIENT_SECRET as string,
    // http://localhost:3000/kinde_callbac
    redirectUrl: `${process.env.KINDE_SITE_URL}/auth/callback` as string,
    grantType: GrantType.AUTHORIZATION_CODE, //or CLIENT_CREDENTIALS or PKCE
    unAuthorisedUrl: `${process.env.KINDE_SITE_URL}/auth/unauthorized` as string,
    postLogoutRedirectUrl: process.env.KINDE_SITE_URL as string
}

const startKinde = async (app: Express) => setupKinde(config, app);


export default startKinde;