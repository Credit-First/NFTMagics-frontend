import Axios from "axios";
import AppConfig from "../utils/AppConfig";

const axios = Axios.create({
    responseType: "json",
    // baseURL: AppConfig.backend_url,
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

axios.interceptors.response.use(function (res) {
    return res;
})

export default axios;