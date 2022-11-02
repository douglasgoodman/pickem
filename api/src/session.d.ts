declare namespace CookieSessionInterfaces {
    interface CookieSessionObject {
        auth?: {
            nonce: string;
            authStartUrl: string;
        };
        user?: {
            id: string;
            email: string;
            accessToken: string;
        };
    }
}
