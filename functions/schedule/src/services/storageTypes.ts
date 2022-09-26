export interface SeasonDocument {
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
