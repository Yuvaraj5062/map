import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_RPR_LIST_REQUEST,
    GET_DATEWISE_LIST_REQUEST,
    GET_MONTHCOUNT_LIST_REQUEST,
    GET_TODAY_LIST_REQUEST,
    GET_REVENU_LIST_REQUEST
    //SET_CLIENT_LIST_REQUEST
} from './constants'

// requirement report
function* getReqReportList () {
    try {
        const response = yield  call( api.getReqReport );
       if (response.data && response.data.Data) {
        yield put( actions.setReqReport( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setReqReport( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetReqReportRequest(){
    yield takeEvery( GET_RPR_LIST_REQUEST, getReqReportList );
}
// datewise report
function* getDatewiseReportList (action) {
    try {
        const response = yield  call( api.getDatewiseReport,action.username, action.startdate, action.enddate, action.clientId );
       if (response.data && response.data.Data) {
        yield put( actions.setDatewiseReport( response.data.Data ) );
        ////console.log(response.data, "Datewiseuire saga working")
       }
       else{
        yield put( actions.setDatewiseReport( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDatewiseReportRequest(){
    yield takeEvery( GET_DATEWISE_LIST_REQUEST, getDatewiseReportList );
}
// Month count report
function* getMonthCountReportList (action) {
    try {
        const response = yield  call( api.getMonthCountReport, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthCountReport( response.data.Data ) );
        ////console.log(response.data, "MonthCountuire saga working")
       }
       else{
        yield put( actions.setMonthCountReport( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthCountReportRequest(){
    yield takeEvery( GET_MONTHCOUNT_LIST_REQUEST, getMonthCountReportList );
}
// Today report
function* getTodayReportList (action) {
    try {
        const response = yield  call( api.getTodayReport, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setTodayReport( response.data.Data ) );
        ////console.log(response.data, "Todayuire saga working")
       }
       else{
        yield put( actions.setTodayReport( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodayReportRequest(){
    yield takeEvery( GET_TODAY_LIST_REQUEST, getTodayReportList );
}
// Revenu report
function* getRevenuReportList (action) {
    try {
        const response = yield  call( api.getRevenuReport, action.username, action.startdate, action.enddate );
       if (response.data && response.data.Data) {
        yield put( actions.setRevenuReport( response.data.Data ) );
        ////console.log(response.data, "Revenuuire saga working")
       }
       else{
        yield put( actions.setRevenuReport( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetRevenuReportRequest(){
    yield takeEvery( GET_REVENU_LIST_REQUEST, getRevenuReportList );
}
function* reqReportSagas() {
    yield all([
        fork( watchGetReqReportRequest ),
        fork( watchGetDatewiseReportRequest ),
        fork(watchGetMonthCountReportRequest),
        fork(watchGetTodayReportRequest),
        fork(watchGetRevenuReportRequest),
    ]);
}

export default reqReportSagas;
