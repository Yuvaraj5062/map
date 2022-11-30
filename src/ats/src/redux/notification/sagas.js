import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_NOTIFY_LIST_REQUEST,
    GET_NEW_NOTIFY_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getNotificationList (action) {
    try {
        const response = yield  call( api.getNotification, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setNotification( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setNotification( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetNotificationRequest(){
    yield takeEvery( GET_NOTIFY_LIST_REQUEST, getNotificationList );
}

function* getNewNotificationList (action) {
    try {
        const response = yield  call( api.getNewNotification, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setNewNotification( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setNewNotification( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetNewNotificationRequest(){
    yield takeEvery( GET_NOTIFY_LIST_REQUEST, getNewNotificationList );
}
function* notificationSagas() {
    yield all([
        fork( watchGetNotificationRequest ),
        fork(watchGetNewNotificationRequest)
    ]);
}

export default notificationSagas;
