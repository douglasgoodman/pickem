import { Express, RequestHandler, Router } from 'express';
import { Readable } from 'node:stream';
import { getUserImage } from '../services/s3Service';

export function addUserRouter(app: Express) {
    const authRouter = Router();
    authRouter.get('/image', userImageHandler);
    app.use('/user', authRouter);
}

export const userImageHandler: RequestHandler = async (req, res) => {
    console.log(JSON.stringify(req.session));
    if (!req.session?.user?.id) {
        res.send(401);
        return;
    }
    const image = await getUserImage(req.session.user.id);
    if (!image) {
        res.send(500);
        return;
    }
    //res.contentType('png');
    image?.pipe(res);
    //image?.on('end', () => res.end());
};
