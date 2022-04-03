import axios from '@/@axios';

export const getLogList = (data:any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/log/fetch_logs',
        {
            data
        }).then(response => {
            const response_data = response.data;
            if (response_data.status) {
                resolve(response_data.data);
            }
            else {
                reject(response_data);
            }
        }).catch(err => {
            reject(err);
        });
    });
};

export const getPriceHistory = (data:any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/log/fetch_price_history',
        {
            data
        }).then(response => {
            const response_data = response.data;
            if (response_data.status) {
                resolve(response_data.data);
            }
            else {
                reject(response_data);
            }
        }).catch(err => {
            reject(err);
        });
    });
};