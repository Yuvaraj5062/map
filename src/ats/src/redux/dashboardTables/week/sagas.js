import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_WEEK_SUBMISSION_REQUEST,
    GET_WEEK_INTERVIEW_REQUEST,
    GET_WEEK_OFFER_REQUEST,
    GET_WEEK_HIRE_REQUEST
} from './constants'


function* getWeekSubmissionList (action) {
    try {
       
        const response = yield  call( api.getWeekSubmission, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setWeekSubmission( response.data.Data ) );
       }
       else{
        yield put( actions.setWeekSubmission( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetWeekSubmissionRequest(){
    yield takeEvery( GET_WEEK_SUBMISSION_REQUEST, getWeekSubmissionList );
}
function* getWeekInterviewList (action) {
    try {
        const response = yield  call( api.getWeekInterview, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setWeekInterview( response.data.Data ) );
       }
       else{
        yield put( actions.setWeekInterview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetWeekInterviewRequest(){
    yield takeEvery( GET_WEEK_INTERVIEW_REQUEST, getWeekInterviewList );
}

function* getWeekOfferList (action) {
    try {
        const response = yield  call( api.getWeekOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setWeekOffer( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setWeekOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetWeekOfferRequest(){
    yield takeEvery( GET_WEEK_OFFER_REQUEST, getWeekOfferList );
}
function* getWeekHireList (action) {
    try {
        const response = yield  call( api.getWeekHire, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setWeekHire( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setWeekHire( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetWeekHireRequest(){
    yield takeEvery( GET_WEEK_HIRE_REQUEST, getWeekHireList );
}
function* weekListSagas() {
    yield all([
        fork( watchGetWeekSubmissionRequest ),
        fork(watchGetWeekInterviewRequest),
        fork(watchGetWeekOfferRequest),
        fork(watchGetWeekHireRequest),
    ]);
}

export default weekListSagas;
