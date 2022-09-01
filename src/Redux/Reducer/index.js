import { combineReducers } from "redux";

import {
    getcontractReducer,
    connectWalletReducer,
    connectMigrateReducer
 
} from '../Reducer/AuthReducer/authReducer'



const rootReducer = combineReducers({
    getcontractReducer,
    connectWalletReducer,
    connectMigrateReducer
  




});

export default rootReducer;