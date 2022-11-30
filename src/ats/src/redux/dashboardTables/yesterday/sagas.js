import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_YESTERDAY_SUBMISSION_REQUEST,
    GET_YESTERDAY_INTERVIEW_REQUEST,
    GET_YESTERDAY_OFFER_REQUEST,
    GET_YESTERDAY_HIRE_REQUEST
} from './constants'


function* getYesterdaySubmissionList (action) {
    try {
        const response = yield  call( api.getYesterdaySubmission, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setYesterdaySubmission( response.data.Data ) );
       }
       else{
        yield put( actions.setYesterdaySubmission( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetYesterdaySubmissionRequest(){
    yield takeEvery( GET_YESTERDAY_SUBMISSION_REQUEST, getYesterdaySubmissionList );
}
function* getYesterdayInterviewList (action) {
    try {
        const response = yield  call( api.getYesterdayInterview, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setYesterdayInterview( response.data.Data ) );
       }
       else{
        yield put( actions.setYesterdayInterview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetYesterdayInterviewRequest(){
    yield takeEvery( GET_YESTERDAY_INTERVIEW_REQUEST, getYesterdayInterviewList );
}

function* getYesterdayOfferList (action) {
    try {
        const response = yield  call( api.getYesterdayOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setYesterdayOffer( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setYesterdayOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetYesterdayOfferRequest(){
    yield takeEvery( GET_YESTERDAY_OFFER_REQUEST, getYesterdayOfferList );
}
function* getYesterdayHireList (action) {
    try {
        const response = yield  call( api.getYesterdayHire, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setYesterdayHire( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setYesterdayHire( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetYesterdayHireRequest(){
    yield takeEvery( GET_YESTERDAY_HIRE_REQUEST, getYesterdayHireList );
}
function* yesterdayListSagas() {
    yield all([
        fork( watchGetYesterdaySubmissionRequest ),
        fork(watchGetYesterdayInterviewRequest),
        fork(watchGetYesterdayOfferRequest),
        fork(watchGetYesterdayHireRequest),
    ]);
}

export default yesterdayListSagas;
