import * as Actions from '../actions';

interface EventType {
    logList: any,
    priceHistory: any,
    logError: any,
    priceError: any
}

const initState: EventType = {
    logList: [],
    priceHistory: [],
    logError: null,
    priceError: null
}

const log = function (state = initState, action: any) {
    switch (action.type) {
        case Actions.TYPE_UPDATE_LOG_LIST:
            return { ...state, logList: action.data }
        case Actions.TYPE_ERROR_LOG:
            return { ...state, logError: action.data }
        case Actions.TYPE_UPDATE_PRICE_HISTORY:
            return { ...state, priceHistory: action.data }
        case Actions.TYPE_ERROR_PRICE_HISTORY:
            return { ...state, priceError: action.data }
        default:
            return state;
    }
}

export default log;