import { combineReducers } from "redux";
import collection from './collection';
import marketplace from './marketplace';

const reducers = combineReducers({
    collection,
    marketplace
})

export default reducers;