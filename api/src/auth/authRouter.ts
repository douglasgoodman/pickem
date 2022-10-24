import { Router, Express } from 'express';
import { RequestHandler } from 'express';
import { google } from 'googleapis';

const clientId =
    '34015227771-o5e7k0j9rj6fqe5v91fngnnb4vv745ad.apps.googleusercontent.com';
const clientSecret = 'no way';
const redirectUri = 'http://localhost:3001/auth/complete';
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];

export function addAuthRouter(app: Express) {
    const authRouter = Router();
    authRouter.get('/start', authStartHandler);
    authRouter.get('/complete', authCompleteHandler);
    app.use('/auth', authRouter);
}

export const authStartHandler: RequestHandler = (req, res) => {
    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri,
    });

    const authorizationUrl = oauth2Client.generateAuthUrl({
        scope: scopes,
        include_granted_scopes: true,
        state: 'some state',
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
    const { data } = await oauth2.userinfo.get(
        {
            oauth_token: tokens.access_token!,
        },
        {}
    );
    const dataString = JSON.stringify(data);
    res.redirect(`http://localhost:3002/authcomplete?data=${dataString}`);
};
