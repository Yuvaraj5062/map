import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_REQUIREMENTS_LIST_REQUEST,
    SET_SAVE_REQUIREMENTS,
    GET_CRITICAL_REQUIREMENTS_LIST,
    UPDATE_REQUIREMNT
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getRequirementList () {
    try {
        const response = yield  call( api.getRequirementList );
       if (response.data && response.data.Data) {
        yield put( actions.setRequirement( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setRequirement( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setSaveRequirement( action ){
        let result = yield call( api.getRequirementList, action.payload, action.jid );
        yield put( action.setSaveRequirement( result.data ) );
    
}
function* updateRequirement( action ){
    try {
        const result = yield call( api.updateRequirement, action.payload );
        yield put( actions.saveRequirement( result.data ) );
        yield call( getRequirementList );
        yield put( actions.hideRequirementModal() );
        ////console.log(result.data);
        swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetRequirementRequest(){
    yield takeEvery( GET_REQUIREMENTS_LIST_REQUEST, getRequirementList );
}
function* watchSetSaveRequirement(){
    yield takeEvery( SET_SAVE_REQUIREMENTS, setSaveRequirement );
}
function* getCriticalRequirementList () {
    try {
        const response = yield  call( api.getCriticleRequirementList );
       if (response.data && response.data.Data) {
        yield put( actions.setCriticalRequirement( response.data.Data ) );
        ////console.log(response.data, "Critical saga working")
       }
       else{
        yield put( actions.setCriticalRequirement( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchCriticalRequirement(){
    yield takeEvery( GET_CRITICAL_REQUIREMENTS_LIST, getCriticalRequirementList );
}
function* watchUpdateRequirement(){
    yield takeEvery( UPDATE_REQUIREMNT, updateRequirement );
}
function* requirementSagas() {
    yield all([
        fork( watchGetRequirementRequest ),
        fork(watchSetSaveRequirement ),
        fork(watchCriticalRequirement),
        fork(watchUpdateRequirement)
    ]);
}

export default requirementSagas;
