import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'blob',
});

export default instance;