import { Router, Express, RequestHandler } from 'express';
import { google } from 'googleapis';
import { SessionUser } from './types';
import { config } from '../config';
import { getUserDocument, putUserDocument } from '../services/storageService';
import { UserDocument } from '@pickem/types';
import { uploadUserImage } from '../services/s3Service';

const redirectUri = `http://${config.domain}:${config.port}/auth/complete`;
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];
const { id: clientId, secret: clientSecret } = config.googleOauthClient;

export function addAuthRouter(app: Express) {
    const authRouter = Router();
    authRouter.get('/fetch', authFetchHandler);
    authRouter.get('/start', authStartHandler);
    authRouter.get('/complete', authCompleteHandler);
    authRouter.get('/signout', signOutHandler);
    app.use('/auth', authRouter);
}

export const authFetchHandler: RequestHandler = async (req, res) => {
    console.log(JSON.stringify(req.session));
    if (!req.session?.user?.id) {
        res.send(401);
        return;
    }
    const userDocument = await getUserDocument(req.session.user.id);
    res.json(userDocument);
};

export const authStartHandler: RequestHandler = (req, res) => {
    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri,
    });

    const loginHint = req.query.hint as string;
    const authorizationUrl = oauth2Client.generateAuthUrl({
        scope: scopes,
        include_granted_scopes: true,
        state: 'some state',
        login_hint: loginHint,
    });
    res.redirect(authorizationUrl);
};

export const authCompleteHandler: RequestHandler = async (req, res) => {
    const error = req.query.error;
    if (!!error) {
        console.error(error);
    }

    const state = req.query.state;
    if (state !== 'some state') {
        console.error('state: ' + state);
    }

    const code = req.query.code as string;
    if (!code || typeof code !== 'string') {
        console.error('no code?');
    }

    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri,
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

    const user: SessionUser = { id: userInfo.id!, email: userInfo.email! };
    req.session!.user = user;

    res.redirect(`http://${config.domain}:${config.webPort}/authcomplete`);
};

export const signOutHandler: RequestHandler = async (req, res) => {};
