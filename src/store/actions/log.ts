import * as apis from '../apis/index';

export const TYPE_UPDATE_LOG_LIST = "TYPE_UPDATE_LOG_LIST";
export const TYPE_ERROR_LOG = "TYPE_ERROR_LOG";
export const TYPE_UPDATE_PRICE_HISTORY = "TYPE_UPDATE_PRICE_HISTORY";
export const TYPE_ERROR_PRICE_HISTORY = "TYPE_ERROR_PRICE_HISTORY";

export const actionUpdateLogList = (data: any) => ({
    type: TYPE_UPDATE_LOG_LIST,
    data
})
export const actionSetErrorLog = (error: any) => ({
    type: TYPE_ERROR_LOG,
    error
})
export const actionUpdatePriceHistory = (data: any) => ({
    type: TYPE_UPDATE_PRICE_HISTORY,
    data
})
export const actionSetErrorPriceHistory = (error: any) => ({
    type: TYPE_ERROR_PRICE_HISTORY,
    error
})
export function actionGetLogList(data:any) {
    return (dispatch: any) => {
        apis.getLogList(data)
        .then((data: any) => {
            return dispatch(actionUpdateLogList(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorLog(error));
        });
    }
}
export function actionGetPriceHistory(data:any) {
    return (dispatch: any) => {
        apis.getPriceHistory(data)
        .then((data: any) => {
            return dispatch(actionUpdatePriceHistory(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorPriceHistory(error));
        });
    }
}
