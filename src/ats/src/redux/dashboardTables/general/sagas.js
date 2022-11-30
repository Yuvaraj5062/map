import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../../helpers/restApi';
import * as actions from './actions';
import {
    GET_PENDING_APPROVAL_REQUEST,
    GET_PENDING_OFFER_REQUEST,
    GET_ACTIVE_REQUIREMENT_REQUEST,
    GET_DEACTIVE_REQUIREMENT_REQUEST
} from './constants'


function* getPendingApprovalList (action) {
    try {
        const response = yield  call( api.getPendingApproval, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setPendingApproval( response.data.Data ) );
       }
       else{
        yield put( actions.setPendingApproval( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetPendingApprovalRequest(){
    yield takeEvery( GET_PENDING_APPROVAL_REQUEST, getPendingApprovalList );
}
function* getPendingOfferList (action) {
    try {
        const response = yield  call( api.getPendingOffer, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setPendingOffer( response.data.Data ) );
       }
       else{
        yield put( actions.setPendingOffer( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetPendingOfferRequest(){
    yield takeEvery( GET_PENDING_OFFER_REQUEST, getPendingOfferList );
}
function* getActiveRequirementList () {
    try {
        const response = yield  call( api.getActiveRequirement );
       if (response.data && response.data.Data) {
        yield put( actions.setActiveRequirement( response.data.Data ) );
       }
       else{
        yield put( actions.setActiveRequirement( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetActiveRequirementRequest(){
    yield takeEvery( GET_ACTIVE_REQUIREMENT_REQUEST, getActiveRequirementList );
}
function* getDeActiveRequirementList () {
    try {
        const response = yield  call( api.getDeActiveRequirement );
       if (response.data && response.data.Data) {
        yield put( actions.setDeActiveRequirement( response.data.Data ) );
       }
       else{
        yield put( actions.setDeActiveRequirement( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetDeActiveRequirementRequest(){
    yield takeEvery( GET_DEACTIVE_REQUIREMENT_REQUEST, getDeActiveRequirementList );
}
function* pendingApprovalSagas() {
    yield all([
        fork( watchGetPendingApprovalRequest ),
        fork(watchGetPendingOfferRequest),
        fork(watchGetActiveRequirementRequest),
        fork(watchGetDeActiveRequirementRequest)
    ]);
}

export default pendingApprovalSagas;
