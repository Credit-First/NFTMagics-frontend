import * as Actions from '../actions';

interface LotteryType {
    currentLotteryItem: any,
    lotteryList: any,
    ticketList: any,
    error: any
}

const initState: LotteryType = {
    currentLotteryItem: null,
    lotteryList: [],
    ticketList: [],
    error: null
}

const lottery = function (state = initState, action: any) {
    switch (action.type) {
        case Actions.TYPE_UPDATE_CURRENT_LOTTERY_ITEM:
            return { ...state, currentLotteryItem: action.data }
        case Actions.TYPE_ERROR_LOTTERY:
            return { ...state, error: action.data }
        case Actions.TYPE_UPDATE_LOTTERY_LIST:
            return { ...state, lotteryList: action.data }
        case Actions.TYPE_UPDATE_TICKET_LIST:
            return { ...state, ticketList: action.data }
        default:
            return state;
    }
}

export default lottery;