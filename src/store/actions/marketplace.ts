import * as apis from '../apis/index';

export const TYPE_UPDATE_MARKET_INFO = "TYPE_UPDATE_MARKET_INFO";
export const TYPE_UPDATE_MARKETPLACE = "TYPE_UPDATE_MARKETPLACE";
export const TYPE_UPDATE_MARKETITEM = "TYPE_UPDATE_MARKETITEM";
export const TYPE_UPDATE_FEATURED_MARKETITEM = "TYPE_UPDATE_FEATURED_MARKETITEM";
export const TYPE_UPDATE_BEWITCH_MARKETITEMS = "TYPE_UPDATE_BEWITCH_MARKETITEMS";
export const TYPE_UPDATE_TOP_MARKETITEMS = "TYPE_UPDATE_TOP_MARKETITEMS";
export const TYPE_UPDATE_GIFT_ITEMS = "TYPE_UPDATE_GIFT_ITEMS";
export const TYPE_ERROR_MARKETPLACE = "TYPE_ERROR_MARKETPLACE";

export function actionGetMarketInfo() {
    return (dispatch: any) =>
        apis.getMarketInfo()
            .then((data) => {
                return dispatch(actionUpdateMarketInfo(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
}
export function actionGetMarketplace(type: any) {
    return (dispatch: any) =>
        apis.getMarketplace({ ...type })
            .then((data) => {
                return dispatch(actionUpdateMarketplace(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
}
export function actionGetMarketItem(type: any) {
    return (dispatch: any) => {
        apis.getMarketItem({ ...type })
            .then((data) => {
                return dispatch(actionUpdateMarketItem(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
    }
}
export function actionGetFeaturedMarketItem() {
    return (dispatch: any) => {
        apis.getFeaturedMarketItem()
            .then((data) => {
                return dispatch(actionUpdateFeaturedMarketItem(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
    }
}
export function actionGetBewitchMarketItems() {
    return (dispatch: any) => {
        apis.getBewitchMarketItems()
            .then((data) => {
                return dispatch(actionUpdateBewitchMarketItems(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
    }
}
export function actionGetTopMarketItems() {
    return (dispatch: any) => {
        apis.getTopMarketItems()
            .then((data) => {
                return dispatch(actionUpdateTopMarketItems(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
    }
}
export function actionGetGiftItems(data:any) {
    return (dispatch: any) => {
        apis.getGiftItems(data)
            .then((data) => {
                return dispatch(actionUpdateGiftItems(data));
            })
            .catch(error => {
                return dispatch(actionSetErrorMarketplace(error));
            });
    }
}
export const actionUpdateMarketInfo = (data: any) => ({
    type: TYPE_UPDATE_MARKET_INFO,
    data
})
export const actionUpdateMarketplace = (data: any) => ({
    type: TYPE_UPDATE_MARKETPLACE,
    data
})
export const actionUpdateMarketItem = (data: any) => ({
    type: TYPE_UPDATE_MARKETITEM,
    data
})
export const actionUpdateFeaturedMarketItem = (data: any) => ({
    type: TYPE_UPDATE_FEATURED_MARKETITEM,
    data
})
export const actionUpdateBewitchMarketItems = (data: any) => ({
    type: TYPE_UPDATE_BEWITCH_MARKETITEMS,
    data
})
export const actionUpdateTopMarketItems = (data: any) => ({
    type: TYPE_UPDATE_TOP_MARKETITEMS,
    data
})
export const actionUpdateGiftItems = (data: any) => ({
    type: TYPE_UPDATE_GIFT_ITEMS,
    data
})
export const actionSetErrorMarketplace = (error: any) => ({
    type: TYPE_ERROR_MARKETPLACE,
    error
})