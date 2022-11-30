import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_MONTH_SUBMISSION_REQUEST,
    GET_MONTH_INTERVIEW_REQUEST,
    GET_MONTH_OFFER_REQUEST,
    GET_MONTH_HIRE_REQUEST
} from './constants'


function* getMonthSubmissionList (action) {
    try {
       
        const response = yield  call( api.getMonthSubmission, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthSubmission( response.data.Data ) );
       }
       else{
        yield put( actions.setMonthSubmission( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthSubmissionRequest(){
    yield takeEvery( GET_MONTH_SUBMISSION_REQUEST, getMonthSubmissionList );
}
function* getMonthInterviewList (action) {
    try {
        const response = yield  call( api.getMonthInterview, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthInterview( response.data.Data ) );
       }
       else{
        yield put( actions.setMonthInterview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthInterviewRequest(){
    yield takeEvery( GET_MONTH_INTERVIEW_REQUEST, getMonthInterviewList );
}

function* getMonthOfferList (action) {
    try {
        const response = yield  call( api.getMonthOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthOffer( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setMonthOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthOfferRequest(){
    yield takeEvery( GET_MONTH_OFFER_REQUEST, getMonthOfferList );
}
function* getMonthHireList (action) {
    try {
        const response = yield  call( api.getMonthHire, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setMonthHire( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setMonthHire( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetMonthHireRequest(){
    yield takeEvery( GET_MONTH_HIRE_REQUEST, getMonthHireList );
}
function* monthListSagas() {
    yield all([
        fork( watchGetMonthSubmissionRequest ),
        fork(watchGetMonthInterviewRequest),
        fork(watchGetMonthOfferRequest),
        fork(watchGetMonthHireRequest),
    ]);
}

export default monthListSagas;
