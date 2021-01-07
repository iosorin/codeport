import axios from 'axios';

export const api = axios.create({
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const form = new FormData();

    Object.keys(config.data).forEach((key) => {
        form.append(key, config.data[key]);
    });

    config.data = form;

    return config;
});
