import axios from 'axios';

export const api = axios.create({
    timeout: 5000,
    headers: {
        common: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    },
});

const reqInterceptor = () => {
    api.interceptors.request.use((config) => {
        console.log('config', config);
        const form = new FormData();

        Object.keys(config.data).forEach((key) => {
            form.append(key, config.data[key]);
        });

        config.data = form;

        return config;
    });
};

reqInterceptor();
