import keycloak from '../config/keycloakConfig';

function logout() {
    keycloak.logout({
        redirectUri: window.location.origin,
    });
}

export default logout;
