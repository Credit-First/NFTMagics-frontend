import Axios from "axios";

const axios = Axios.create({
    responseType: "json",
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

axios.interceptors.response.use(function (res) {
    return res;
})

export default axios;