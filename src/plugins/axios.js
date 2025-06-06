import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8086/api"
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { client };
