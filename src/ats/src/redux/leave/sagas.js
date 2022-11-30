import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_LEAVE_LIST_REQUEST,
    GET_LEAVE_BALANCE_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getLeaveList (action) {
    try {
        const response = yield  call( api.getLeave, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setLeave( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setLeave( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* getLeaveBalanceList (action) {
    try {
        const response = yield  call( api.getLeaveBalance, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setLeaveBalance( response.data.Data ) );
        //console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setLeaveBalance( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetLeaveRequest(){
    yield takeEvery( GET_LEAVE_LIST_REQUEST, getLeaveList );
}
function* watchGetLeaveBalanceRequest(){
    yield takeEvery( GET_LEAVE_BALANCE_LIST_REQUEST, getLeaveBalanceList );
}
function* leaveSagas() {
    yield all([
        fork( watchGetLeaveRequest ),
        fork(watchGetLeaveBalanceRequest),
    ]);
}

export default leaveSagas;
