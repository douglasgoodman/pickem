interface Environment {
    domain: string;
    apiPort: string;
    apiHost: string;
}

export const environment: Environment = {
    domain: DOMAIN,
    apiPort: API_PORT,
    apiHost: `http://${DOMAIN}:${API_PORT}`,
};
