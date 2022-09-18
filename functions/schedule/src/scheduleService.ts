import Axios from 'axios';
import { join } from 'path';
import { writeFileSync } from 'fs';

enum CalendarType {
    Preseason = '1',
    RegularSeason = '2',
    Postseason = '3',
}

const scoreboardUrl =
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

interface EventStatus {
    type: {
        state: 'pre' | 'in' | 'post';
        completed: boolean;
        description: string;
    };
}

interface Calendar {
    label: string;
    value: string;
    entries: {
        label: string;
        detail: string;
        value: string;
        startDate: string;
        endDate: string;
    }[];
}

interface Competitor {
    homeAway: 'home' | 'away';
    team: {
        displayName: string;
        abbreviation: string;
        logo: string;
    };
    score: string;
}

interface Scoreboard {
    leagues: {
        season: { year: number; startDate: string; endDate: string };
        calendar: Calendar[];
    }[];
    season: { type: number; year: number };
    week: { number: number };
    events: {
        id: string;
        date: string;
        competitions: {
            competitors: Competitor[];
            status: EventStatus;
        }[];
    }[];
}

export async function updateCurrentYearSchedule() {
    // update the schedule every day
    // get game matchups for each week and update doc - home teams and away team, date and time
    const { data: scoreboard } = await Axios.get<Scoreboard>(scoreboardUrl);

    const preseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Preseason
        )!
    );
    const regularSeasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.RegularSeason
        )!
    );
    const postseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Postseason
        )!
    );

    const season: Season = {
        isCurrent: true,
        year: scoreboard.season.year,
        weeks: [...preseasonWeeks, ...regularSeasonWeeks, ...postseasonWeeks],
    };

    const path = join(__dirname, 'season.json');
    writeFileSync(path, JSON.stringify(season));
}

async function convertCalendarToWeeks(calendar: Calendar): Promise<Week[]> {
    const weeks: Week[] = [];
    for (const week of calendar.entries) {
        const { data: weekScoreboard } = await Axios.get<Scoreboard>(
            `${scoreboardUrl}?seasontype=${calendar.value}&week=${week.value}`
        );

        const games: Game[] = [];

        for (const event of weekScoreboard.events) {
            const homeCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'home'
            )!;
            const awayCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'away'
            )!;
            games.push({
                dateTime: event.date,
                status: convertEventStatusToGameStatus(
                    event.competitions[0].status
                ),
                home: convertCompetitorToTeam(homeCompetitor),
                away: convertCompetitorToTeam(awayCompetitor),
                homeScore: +homeCompetitor.score,
                awayScore: +awayCompetitor.score,
            });
        }

        weeks.push({
            number: week.value,
            isPreseason: calendar.value === CalendarType.Preseason,
            isRegularSeason: calendar.value === CalendarType.RegularSeason,
            isPostseason: calendar.value === CalendarType.Postseason,
            games,
        });
    }

    return weeks;
}

function convertEventStatusToGameStatus(status: EventStatus): GameStatus {
    switch (status.type.state) {
        case 'pre':
            return 'future';
        case 'in':
            return 'inProgress';
        case 'post':
        default:
            return 'complete';
    }
}

function convertCompetitorToTeam(competitor: Competitor): Team {
    return {
        name: competitor.team.displayName,
        abbreviation: competitor.team.abbreviation,
        imageUrl: competitor.team.logo,
    };
}

export interface Season {
    isCurrent: boolean;
    year: number;
    weeks: Week[];
}

export interface Week {
    number: string;
    isPreseason: boolean;
    isRegularSeason: boolean;
    isPostseason: boolean;
    games: Game[];
}

export type GameStatus = 'future' | 'inProgress' | 'complete';

export interface Game {
    dateTime: string; // "2022-08-01T07:00Z"
    status: GameStatus;
    home: Team;
    away: Team;
    homeScore?: number;
    awayScore?: number;
    homeSpread?: number;
    awaySpread?: number;
}

export interface Team {
    name: string;
    abbreviation: string;
    imageUrl: string;
}
