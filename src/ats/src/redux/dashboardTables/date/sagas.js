import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_DATE_SUBMISSION_REQUEST,
    GET_DATE_INTERVIEW_REQUEST,
    GET_DATE_OFFER_REQUEST,
    GET_DATE_HIRE_REQUEST
} from './constants'


function* getDateSubmissionList (action) {
    try {
        const response = yield  call( api.getDateSubmission, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setDateSubmission( response.data.Data ) );
       }
       else{
        yield put( actions.setDateSubmission( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDateSubmissionRequest(){
    yield takeEvery( GET_DATE_SUBMISSION_REQUEST, getDateSubmissionList );
}
function* getDateInterviewList (action) {
    try {
        const response = yield  call( api.getDateInterview, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setDateInterview( response.data.Data ) );
       }
       else{
        yield put( actions.setDateInterview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDateInterviewRequest(){
    yield takeEvery( GET_DATE_INTERVIEW_REQUEST, getDateInterviewList );
}

function* getDateOfferList (action) {
    try {
        const response = yield  call( api.getDateOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setDateOffer( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setDateOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDateOfferRequest(){
    yield takeEvery( GET_DATE_OFFER_REQUEST, getDateOfferList );
}
function* getDateHireList (action) {
    try {
        const response = yield  call( api.getDateHire, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setDateHire( response.data.Data ) );
        //alert(response.data.Data )
       }
       else{
        yield put( actions.setDateHire( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDateHireRequest(){
    yield takeEvery( GET_DATE_HIRE_REQUEST, getDateHireList );
}
function* dateListSagas() {
    yield all([
        fork( watchGetDateSubmissionRequest ),
        fork(watchGetDateInterviewRequest),
        fork(watchGetDateOfferRequest),
        fork(watchGetDateHireRequest),
    ]);
}

export default dateListSagas;
