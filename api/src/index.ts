import express from 'express';
import session from 'cookie-session';
import { addAuthRouter } from './auth/authRouter';
import { getSeasonDocument } from './services/storageService';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import { config } from './config';
import { addUserRouter } from './user/userRouter';

const app = express();
app.set('trust proxy', true);

app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        colorize: true,
    })
);

app.use(
    cors({ origin: 'http://sendpicks-test.football:3000', credentials: true })
);

app.use(
    session({
        secret: 'keyboardcat',
    })
);

app.get('/schedule', async (_req, res) => {
    const doc = await getSeasonDocument();
    res.json(doc);
});

addAuthRouter(app);
addUserRouter(app);

app.listen(config.port, () => {
    console.log(`Example app listening http://${config.domain}:${config.port}`);
});
