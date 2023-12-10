import axios from 'axios'
window.axios = axios

import qs from 'qs';


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://localhost:8081/api/';
import store from './store';



axios.defaults.paramsSerializer = params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
};

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('access_token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axios.interceptors.response.use((response) => {
    if (response.status == 201) {
        store.dispatch("showMessage", "Prawidłowo utworzono")
    }
    else if (response.status == 234) {
        store.dispatch("showMessage", "Prawidłowo zaaktualizowano")
    }
    else if (response.status == 250) {
        store.dispatch("showMessage", "Prawidłowo usunięto")
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        if (error.response.status != 403 && error.response.status != 401) {

            var message = error.response.data.message;
            if (message && message.length) {
                store.dispatch("showError", message)
            }
        }
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});