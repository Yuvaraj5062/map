import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_TODAY_SUBMISSION_REQUEST,
    GET_TODAY_INTERVIEW_REQUEST,
    GET_TODAY_OFFER_REQUEST,
    GET_TODAY_HIRE_REQUEST
} from './constants'


function* getTodaySubmissionList (action) {
    try {
        const response = yield  call( api.getTodaySubmission, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setTodaySubmission( response.data.Data ) );
       }
       else{
        yield put( actions.setTodaySubmission( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodaySubmissionRequest(){
    yield takeEvery( GET_TODAY_SUBMISSION_REQUEST, getTodaySubmissionList );
}
function* getTodayInterviewList (action) {
    try {
        const response = yield  call( api.getTodayInterview, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setTodayInterview( response.data.Data ) );
       }
       else{
        yield put( actions.setTodayInterview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodayInterviewRequest(){
    yield takeEvery( GET_TODAY_INTERVIEW_REQUEST, getTodayInterviewList );
}

function* getTodayOfferList (action) {
    try {
        const response = yield  call( api.getTodayOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setTodayOffer( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setTodayOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodayOfferRequest(){
    yield takeEvery( GET_TODAY_OFFER_REQUEST, getTodayOfferList );
}
function* getTodayHireList (action) {
    try {
        const response = yield  call( api.getTodayHire, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setTodayHire( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setTodayHire( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetTodayHireRequest(){
    yield takeEvery( GET_TODAY_HIRE_REQUEST, getTodayHireList );
}
function* todayListSagas() {
    yield all([
        fork( watchGetTodaySubmissionRequest ),
        fork(watchGetTodayInterviewRequest),
        fork(watchGetTodayOfferRequest),
        fork(watchGetTodayHireRequest),
    ]);
}

export default todayListSagas;
