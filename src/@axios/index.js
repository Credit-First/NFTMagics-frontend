import Axios from "axios";
import AppConfig from "../utils/AppConfig";

const axios = Axios.create({
    responseType: "json",
    baseURL: AppConfig.backend_url,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

axios.interceptors.response.use(function (res) {
    return res;
})

export default axios;