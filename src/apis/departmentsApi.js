import axios from "axios";

const departmentsApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/departments`
});


departmentsApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default departmentsApi;
