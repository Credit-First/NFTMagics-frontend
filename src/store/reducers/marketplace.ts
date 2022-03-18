import * as Actions from '../actions';

interface MarketplaceType {
    marketInfo: any,
    marketplace: any,
    currentMarketItem: any
    featuredMarketItem: any,
    bewitchMarketItems: any,
    topMarketItems: any,
    error: any
}

const initState: MarketplaceType = {
    marketInfo: null,
    marketplace: [],
    currentMarketItem: null,
    featuredMarketItem: null,
    bewitchMarketItems: null,
    topMarketItems: null,
    error: null
}

const marketplace = function (state = initState, action: any) {
    switch (action.type) {
        case Actions.TYPE_UPDATE_MARKET_INFO:
            return { ...state, marketInfo: action.data }
        case Actions.TYPE_UPDATE_MARKETPLACE:
            return { ...state, marketplace: action.data }
        case Actions.TYPE_UPDATE_MARKETITEM:
            return { ...state, currentMarketItem: action.data }
        case Actions.TYPE_UPDATE_FEATURED_MARKETITEM:
            return { ...state, featuredMarketItem: action.data }
        case Actions.TYPE_UPDATE_BEWITCH_MARKETITEMS:
            return { ...state, bewitchMarketItems: action.data }
            case Actions.TYPE_UPDATE_TOP_MARKETITEMS:
                return { ...state, topMarketItems: action.data }
        case Actions.TYPE_ERROR_MARKETPLACE:
            return { ...state, error: action.data }
        default:
            return state;
    }
}

export default marketplace;