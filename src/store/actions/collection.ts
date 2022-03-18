import * as apis from '../apis/index';

export const TYPE_UPDATE_COLLECTION_ITEM = "TYPE_UPDATE_COLLECTION_ITEM";
export const TYPE_UPDATE_COLLECTION_LIST = "TYPE_UPDATE_COLLECTION_LIST";
export const TYPE_ERROR_COLLECTION = "TYPE_ERROR_COLLECTION";

export const actionUpdateCollectionItem = (data: any) => ({
    type: TYPE_UPDATE_COLLECTION_ITEM,
    data
})
export const actionUpdateCollectionList = (data: any) => ({
    type: TYPE_UPDATE_COLLECTION_LIST,
    data
})
export function actionGetCollectionItem(data: any) {
    return (dispatch: any) => {
        apis.getCollectionItem(data)
        .then((data) => {
            return dispatch(actionUpdateCollectionItem(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorCollection(error));
        });
    }
}
export function actionGetCollectionList(account: any) {
    return (dispatch: any) => {
        apis.getCollectionList(account)
        .then((data) => {
            return dispatch(actionUpdateCollectionList(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorCollection(error));
        });
    }
}
export const actionSetErrorCollection = (error: any) => ({
    type: TYPE_ERROR_COLLECTION,
    error
})
