

import {all} from "redux-saga/effects";
import { combineReducers } from "redux";
import { adminSlice } from "./_redux/adminSlice";
import { userMasterSlice } from "./_redux/userMaster/userMasterSlice";
import { vehicleMasterSlice } from "./_redux/vehicleMaster/VehicleMasterSlice";
import { tripMasterSlice } from "./_redux/tripMaster/tripMasterSlice";
import { roleMasterSlice } from "./_redux/roleMaster/roleMasterSlice";
import * as auth from '../module/Auth/_redux/authRedux'


export const rootReducer = combineReducers({
    admin: adminSlice.reducer,
    auth: auth.reducer,
    userMaster:userMasterSlice.reducer,
    vehicleMaster:vehicleMasterSlice.reducer,
    tripMaster:tripMasterSlice.reducer,
    roleMaster:roleMasterSlice.reducer,

});


export function* rootSaga(){
    yield all([auth.saga()]);
}



