import Axios from "axios";

const axios = Axios.create({
    responseType: "json",
    // baseURL: 'http://localhost:5000',
    baseURL: process.env.BACKEND_URL,
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