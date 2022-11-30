import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import {
    ADD_REQUIREMENT,
    GET_REQUIREMENT_LIST_REQUEST,
    UPDATE_REQUIREMENT,
    DELETE_REQUIREMENT
    //SET_REQUIREMENT_LIST_REQUEST
} from './constants'


function* getReqList () {
    try {
        const response = yield  call( api.getRequirementList );
       if (response.data && response.data.Data) {
        yield put( actions.getReq( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getReq( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setReq( action ){
    try {
      //  const result = yield call( api.setRequirement, action.payload );
       // yield put( actions.setReqRquest( result.data ) );
        yield call( getReqList );
       // //console.log(result.data);
       // swal("Record Created Successful", "success");
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}

function* updateReq( action ){
    try {
        const result = yield call( api.updateRequirement, action.payload );
        yield put( actions.setReqRquest( result.data ) );
        yield call( getReqList );
        yield put( actions.hideReqModal() );
        ////console.log(result.data);
        swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}

function* deleteReq( action ){
    try {
        const result = yield call( api.deleteUser, action.payload );
        yield put( actions.setReqRquest( result.data ) );
        yield call( getReqList );
        yield put( actions.hideReqDeleteModal() );
        ////console.log(result.data);
        swal("Record Deleted Successful", "success");
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetUserRequest(){
    yield takeEvery( GET_REQUIREMENT_LIST_REQUEST, getReqList );
}
function* watchSetUser(){
    yield takeEvery( ADD_REQUIREMENT, setReq );
}
function* watchUpdateUser(){
    yield takeEvery( UPDATE_REQUIREMENT, updateReq );
}
function* watchDeleteUser(){
    yield takeEvery( DELETE_REQUIREMENT, deleteReq );
}
function* reqSagas() {
    yield all([
        fork( watchGetUserRequest ),
        fork( watchSetUser ),
        fork(watchUpdateUser),
        fork(watchDeleteUser)
    ]);
}

export default reqSagas;
