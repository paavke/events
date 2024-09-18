import axios from 'axios';
import keycloak from '../config/keycloakConfig';

const createApiClient = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,  // Pass the specific baseURL for the microservice
    });

    // Add a request interceptor to include the token
    instance.interceptors.request.use(
        async (config) => {
            if (keycloak.token) {
                const tokenExpiry = keycloak.tokenParsed?.exp;
                const now = Date.now() / 1000;

                if (tokenExpiry && tokenExpiry - now < 60) { // Check if the token is about to expire
                    try {
                        await keycloak.updateToken(60); // Try to refresh the token
                        config.headers.Authorization = `Bearer ${keycloak.token}`;
                    } catch (error) {
                        keycloak.logout(); // Log out if token refresh fails
                        return Promise.reject(error);
                    }
                } else {
                    config.headers.Authorization = `Bearer ${keycloak.token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default createApiClient;
