const config = {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    authBaseURL: process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8080',
    realm: process.env.REACT_APP_KEYCLOAK_REALM || 'danilo_eventure',
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'eventure-app',
    apikey: process.env.REACT_APP_APIMAN_API_KEY || 'dd4c8216-cfb7-4629-aad3-bb3da1a4c4ec',
};

export default config;
