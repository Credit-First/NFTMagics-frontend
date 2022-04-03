import axios from '@/@axios';

export const getMarketInfo = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_market_info')
        .then(response => {
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
export const getMarketplace = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_marketplace', {
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
export const getMarketItem = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_marketItem', {
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
export const getFeaturedMarketItem = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_featuredMarketItem', {
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
export const getBewitchMarketItems = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_bewitchMarketItems', {
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
export const getTopMarketItems = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_topMarketItems', {
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
export const getGiftItems = (data:any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/fetch_giftItems', {
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
export const createMarketItem = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/marketplace/create_marketItem', {
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