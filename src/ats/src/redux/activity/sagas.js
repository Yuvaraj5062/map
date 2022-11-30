import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_DT_LIST_REQUEST,
    GET_TOIN_LIST_REQUEST,
    GET_MONOF_LIST_REQUEST,
    GET_MONTHJOIN_LIST_REQUEST,
    GET_ATSACTI_LIST_REQUEST,
    GET_ATSGRAPH_LIST_REQUEST
} from './constants'

//Daily Target Submission
function* getDailyTargetList () {
    try {
        const response = yield  call( api.getDailyTargetList );
       if (response.data && response.data.Data) {
        yield put( actions.setDailyTargetList( response.data.Data ) );
       }
       else{
        yield put( actions.setDailyTargetList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDailyTargetRequest(){
    yield takeEvery( GET_DT_LIST_REQUEST, getDailyTargetList );
}
// Todays Interview
function* getTodaysInterviewList () {
    try {
        const response = yield  call( api.getTodaysInterviewtList );
       if (response.data && response.data.Data) {
        yield put( actions.setTodaysInterviewList( response.data.Data ) );
       }
       else{
        yield put( actions.setTodaysInterviewList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodaysInterviewRequest(){
    yield takeEvery( GET_TOIN_LIST_REQUEST, getTodaysInterviewList );
}
// Month Offer
function* getMonthOfferList () {
    try {
        const response = yield  call( api.getMonthOfferList );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthOfferList( response.data.Data ) );
       }
       else{
        yield put( actions.setMonthOfferList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthOfferRequest(){
    yield takeEvery( GET_MONOF_LIST_REQUEST, getMonthOfferList );
}

// Month to be join
function* getMonthToBeJoinList () {
    try {
        const response = yield  call( api.getMonthToBeJoinList );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthToBeJoinList( response.data.Data ) );
       }
       else{
        yield put( actions.setMonthToBeJoinList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthToBeJoinRequest(){
    yield takeEvery( GET_MONTHJOIN_LIST_REQUEST, getMonthToBeJoinList );
}
// Ats activity
function* getAtsActivityList () {
    try {
        const response = yield  call( api.getAtsActivityList );
       if (response.data && response.data.Data) {
        yield put( actions.setAtsActivityList( response.data.Data ) );
       }
       else{
        yield put( actions.setAtsActivityList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetAtsActivityRequest(){
    yield takeEvery( GET_ATSACTI_LIST_REQUEST, getAtsActivityList );
}
// Graph list api
function* getAtsGraphList (action) {
    try {
        const response = yield  call( api.getAtsGraphList, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setAtsGraphList( response.data.Data ) );
       }
       else{
        yield put( actions.setAtsGraphList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetAtsGraphRequest(){
    yield takeEvery( GET_ATSGRAPH_LIST_REQUEST, getAtsGraphList );
}

function* activitySagas() {
    yield all([
        fork( watchGetDailyTargetRequest ),
        fork( watchGetTodaysInterviewRequest ),
        fork( watchGetMonthOfferRequest ),
        fork(watchGetMonthToBeJoinRequest),
        fork(watchGetAtsActivityRequest),
        fork(watchGetAtsGraphRequest),
    ]);
}

export default activitySagas;
