import { Router, Express, RequestHandler, Request } from 'express';
import {
    uniqueNamesGenerator,
    Config,
    names,
    adjectives,
    colors,
    animals,
} from 'unique-names-generator';

const nameGeneratorConfig: Config = {
    dictionaries: [names, ['the'], adjectives, colors, animals],
    separator: '-',
    length: 5,
};

export function addLeagueRouter(app: Express) {
    const leagueRouter = Router();
    leagueRouter.post('/create', createLeagueHandler);
    app.use('/league', leagueRouter);
}

export const createLeagueHandler: RequestHandler = async (req, res) => {
    if (!req.session?.user?.id) {
        res.status(401).send('Unauthorized');
        return;
    }

    const name = uniqueNamesGenerator(nameGeneratorConfig).toLowerCase();
    console.log(name);
    res.status(200).send({ id: name });
};
