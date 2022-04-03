import { combineReducers } from "redux";
import collection from './collection';
import marketplace from './marketplace';
import lottery from './lottery';
import log from './log';

const reducers = combineReducers({
    collection,
    marketplace,
    lottery,
    log
})

export default reducers;