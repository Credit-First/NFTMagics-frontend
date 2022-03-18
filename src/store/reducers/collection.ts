import * as Actions from '../actions';

interface CollectionType {
    collectionItem: any,
    collectioinList: any,
    error: any
}

const initState: CollectionType = {
    collectionItem: null,
    collectioinList: [],
    error: null
}

const collection = function (state = initState, action: any) {
    switch (action.type) {
        case Actions.TYPE_UPDATE_COLLECTION_ITEM:
            return { ...state, collectionItem: action.data }
        case Actions.TYPE_ERROR_COLLECTION:
            return { ...state, error: action.data }
        case Actions.TYPE_UPDATE_COLLECTION_LIST:
            return { ...state, collectioinList: action.data }
        default:
            return state;
    }
}

export default collection;