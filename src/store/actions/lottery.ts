import * as apis from '../apis/index';

export const TYPE_UPDATE_CURRENT_LOTTERY_ITEM = "TYPE_UPDATE_CURRENT_LOTTERY_ITEM";
export const TYPE_UPDATE_LOTTERY_LIST = "TYPE_UPDATE_LOTTERY_LIST";
export const TYPE_UPDATE_TICKET_LIST = "TYPE_UPDATE_TICKET_LIST";
export const TYPE_ERROR_LOTTERY = "TYPE_ERROR_LOTTERY";

export const actionUpdateCurrentLotteryItem = (data: any) => ({
    type: TYPE_UPDATE_CURRENT_LOTTERY_ITEM,
    data
})
export const actionUpdateLotteryList = (data: any) => ({
    type: TYPE_UPDATE_LOTTERY_LIST,
    data
})
export const actionSetErrorLottery = (error: any) => ({
    type: TYPE_ERROR_LOTTERY,
    error
})
export const actionUpdateTicketList = (data: any) => ({
    type: TYPE_UPDATE_TICKET_LIST,
    data
})
export function actionGetCurrentLotteryItem() {
    return (dispatch: any) => {
        apis.getCurrentLotteryItem()
        .then((data: any) => {
            return dispatch(actionUpdateCurrentLotteryItem(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorLottery(error));
        });
    }
}
export function actionGetLotteryList() {
    return (dispatch: any) => {
        apis.getLotteryList()
        .then((data) => {
            return dispatch(actionUpdateLotteryList(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorLottery(error));
        });
    }
}
export function actionGetTicketList(data: any) {
    return (dispatch: any) => {
        apis.getTicketList(data)
        .then((data) => {
            return dispatch(actionUpdateTicketList(data));
        })
        .catch(error => {
            return dispatch(actionSetErrorLottery(error));
        });
    }
}
