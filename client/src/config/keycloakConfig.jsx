import axios from 'axios';
import Keycloak from 'keycloak-js';
import config from './config';

const keycloak = new Keycloak({
    url: `${config.baseURL}/auth`,
    realm: config.realm,
    clientId: config.clientId,
});
export const initKeycloak = () => {
    return keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        if (!authenticated) {
            window.location.reload();
        } else {
            console.log('Authenticated');

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + keycloak.token;


            return keycloak;
        }
    }).catch(console.error);
};

export default keycloak;
