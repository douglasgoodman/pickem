interface Environment {
    webDomain: string;
    apiDomain: string;
}

export const environment: Environment = {
    webDomain: `https://www.${DOMAIN}`,
    apiDomain: `https://api.${DOMAIN}`,
};
