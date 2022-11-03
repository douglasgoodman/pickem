import { Router, Express, RequestHandler, response } from 'express';
import { google } from 'googleapis';
import { config } from '../config';
import { getUserDocument, putUserDocument } from '../services/storageService';
import { UserDocument } from '@pickem/types';
import { uploadUserImage } from '../services/s3Service';
import { randomBytes } from 'node:crypto';
import { _Error } from '@aws-sdk/client-s3';

const authRedirectUrl = `https://${config.apiDomain}/auth/redirect`;
const authCompleteUri = `https://${config.apiDomain}/auth/complete`;

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];
const { id: clientId, secret: clientSecret } = config.googleOauthClient;

export function addAuthRouter(app: Express) {
    const authRouter = Router();
    authRouter.get('/fetch', authFetchHandler);
    authRouter.get('/start', authStartHandler);
    authRouter.get('/redirect', authRedirectHandler);
    authRouter.get('/complete', authCompleteHandler);
    authRouter.get('/signout', signOutHandler);
    app.use('/auth', authRouter);
}

export const authFetchHandler: RequestHandler = async (req, res) => {
    console.log(JSON.stringify(req.session));
    if (!req.session?.user) {
        res.sendStatus(401);
        return;
    }
    const userDocument = await getUserDocument(req.session.user.id);
    res.json(userDocument);
};

export const authStartHandler: RequestHandler = (req, res) => {
    if (!req.session) {
        res.sendStatus(401);
        return;
    }

    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri: authCompleteUri,
    });

    const loginHint = req.query.hint as string;
    const nonce = randomBytes(16).toString('base64');
    const authStartUrl = oauth2Client.generateAuthUrl({
        scope: scopes,
        include_granted_scopes: true,
        state: nonce,
        login_hint: loginHint,
    });
    req.session.auth = { nonce, authStartUrl };
    res.json({ url: authRedirectUrl });
};

export const authRedirectHandler: RequestHandler = async (req, res) => {
    if (!req.session?.auth?.authStartUrl) {
        res.sendStatus(401);
        return;
    }
    res.redirect(req.session.auth.authStartUrl);
};

export const authCompleteHandler: RequestHandler = async (req, res) => {
    const error = req.query.error;
    if (!!error) {
        console.error(error);
    }

    if (!req.session?.auth) {
        res.sendStatus(401);
        return;
    }

    if (req.query.state !== req.session.auth.nonce) {
        res.sendStatus(401);
        return;
    }

    const code = req.query.code as string;
    if (!code || typeof code !== 'string') {
        console.error('no code?');
        res.sendStatus(401);
        return;
    }

    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri: authCompleteUri,
    });

    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.access_token) {
        console.log('no access token!!');
    }

    const oauth2 = google.oauth2('v2');
    const { data: userInfo } = await oauth2.userinfo.get({
        oauth_token: tokens.access_token!,
    });

    const userDocument: UserDocument = {
        id: userInfo.id!,
        email: userInfo.email!,
        firstName: userInfo.given_name!,
        lastName: userInfo.family_name!,
        fullName: userInfo.name!,
        gender: userInfo.gender!,
    };

    if (userInfo.picture) {
        const url = await uploadUserImage(userDocument.id, userInfo.picture);
        if (!!url) {
            userDocument.userImageUrl = url;
        }
    }

    await putUserDocument(userDocument);

    req.session.auth = undefined;

    req.session!.user = {
        id: userInfo.id!,
        email: userInfo.email!,
        accessToken: tokens.access_token!,
    };

    res.redirect(`https://${config.webDomain}`);
};

export const signOutHandler: RequestHandler = async (req, res) => {
    req.session = null;
    res.sendStatus(200);
};
