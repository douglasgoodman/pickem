interface Config {
    domain: string;
    port: number;
    webPort: number;
    googleOauthClient: {
        id: string;
        secret: string;
    };
    aws: {
        region: string;
    };
}

export const config: Config = {
    domain: process.env.DOMAIN!,
    port: +process.env.API_PORT!,
    webPort: +process.env.WEB_PORT!,
    googleOauthClient: {
        id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    },
    aws: {
        region: process.env.AWS_REGION!,
    },
};
