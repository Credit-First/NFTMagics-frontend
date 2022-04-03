import axios from '@/@axios';

export const getCurrentLotteryItem = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/lottery/fetch_current_lottery_item').then(response => {
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
export const getLotteryList = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/lottery/fetch_lottery_list').then(response => {
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
export const getTicketList = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/lottery/fetch_ticket_list', {
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