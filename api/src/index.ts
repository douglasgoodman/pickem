import express from 'express';
import session from 'cookie-session';
import { addAuthRouter } from './auth/authRouter';
import { getSeasonDocument } from './services/storageService';
import { config } from './config';
import { addUserRouter } from './user/userRouter';
import morgan from 'morgan';

const app = express();
app.set('trust proxy', true);

app.use(morgan('tiny'));

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);

app.use(
    session({
        secret: config.session.secret,
        expires,
    })
);

app.get('/schedule', async (_req, res) => {
    const doc = await getSeasonDocument();
    res.json(doc);
});

addAuthRouter(app);
addUserRouter(app);

app.get('/hi', (_, res) => {
    res.send('hello!!');
});

app.listen(config.port, () => {
    console.log(`Example app listening https://localhost:${config.port}`);
});
