import { Express } from 'express';
import { LeagueRoute } from '@pickem/api-sdk';
import { createLeagueHandler } from './createLeagueHandler';
import { joinLeagueHandler } from './joinLeagueHandler';

export function addLeagueRouter(app: Express) {
    app.post(LeagueRoute.create, createLeagueHandler);
    app.post(LeagueRoute.join, joinLeagueHandler);
}
