import axios from 'axios';

export const http = axios.create({
    timeout: 10000,
});

http.interceptors.request.use((config) => {
    const form = new FormData();

    Object.keys(config.data).forEach((key) => {
        form.append(key, config.data[key]);
    });

    config.data = form;

    return config;
});
