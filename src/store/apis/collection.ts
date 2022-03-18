import axios from '@/@axios';

export const getCollectionItem = (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/collection/fetch_collection_item', {
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
export const getCollectionList = (data:any) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/collection/fetch_collection_list', {
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