import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import {
    ADD_USER,
    GET_USER_LIST_REQUEST,
    UPDATE_USER,
    DELETE_USER,
    GET_CERTFICATE ,
    GET_CONFIRMATIO_LETTER,
    GET_INTERNSHIP_LETTER
    //SET_USER_LIST_REQUEST
} from './constants'


function* getUserList () {
    try {
        const response = yield  call( api.getUserList );
       if (response.data && response.data.Data) {
        yield put( actions.getUser( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getUser( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setUser( action ){
    try {
       // const result = yield call( api.setUser, action.payload );
       // yield put( actions.setUserRquest( result.data ) );
        yield call( getUserList );
       // ////console.log(result.data);
       // swal("Record Created Successful", "success");
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}

function* updateUser( action ){
    try {
        const result = yield call( api.updateUser, action.payload );
        yield put( actions.setUserRquest( result.data ) );
        yield call( getUserList );
        yield put( actions.hideUserModal() );
        ////console.log(result.data);
       // swal("Record Updated Successful", "success");
       swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}

function* deleteUser( action ){
    try {
        const result = yield call( api.deleteUser, action.payload );
        yield put( actions.setUserRquest( result.data ) );
        yield call( getUserList );
        yield put( actions.hideUserDeleteModal() );
        swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}


// // Get Certificate
// function* getCertficates (action) {
//     try {
//         const response = yield  call( api.getCertficates, action.payload);
//        if (response.data && response.data.Data) {
//         yield put( actions.getCertficates( response.data.Data ) );
//         ////console.log(response.data, "Require saga working")
//        }
//        else{
//         yield put( actions.getCertficates( [] ) );
//        }
//     } catch (error) {
//         //console.log(error);
//     }
// }

// function* getConfirmationCertficates (action) {
//     try {
//         const response = yield  call( api.getConfirmationCertficates, action.payload);
//        if (response.data && response.data.Data) {
//         yield put( actions.getConfirmationCertficates( response.data.Data ) );
//         ////console.log(response.data, "Require saga working")
//        }
//        else{
//         yield put( actions.getConfirmationCertficates( [] ) );
//        }
//     } catch (error) {
//         //console.log(error);
//     }
// }


// function* getInternShipLetter (action) {
//     try {
//         const response = yield  call( api.getInternShipLetter, action.payload);
//        if (response.data && response.data.Data) {
//         yield put( actions.getInternShipLetter( response.data.Data ) );
//         ////console.log(response.data, "Require saga working")
//        }
//        else{
//         yield put( actions.getInternShipLetter( [] ) );
//        }
//     } catch (error) {
//         //console.log(error);
//     }
// }




function* watchGetUserRequest(){
    yield takeEvery( GET_USER_LIST_REQUEST, getUserList );
}
function* watchSetUser(){
    yield takeEvery( ADD_USER, setUser );
}
function* watchUpdateUser(){
    yield takeEvery( UPDATE_USER, updateUser );
}
function* watchDeleteUser(){
    yield takeEvery( DELETE_USER, deleteUser );
}

// function* watchGetCertificates(){
//     yield takeEvery( GET_CERTFICATE , getCertficates );  
// }

// function* watchGetConfirmationCertficates(){
//     yield takeEvery( GET_CONFIRMATIO_LETTER , getConfirmationCertficates );  
// }

// function* watchGetInternShipLetter(){
//     yield takeEvery( GET_INTERNSHIP_LETTER , getInternShipLetter );  
// }

function* userSagas() {
    yield all([
        fork( watchGetUserRequest ),
        fork( watchSetUser ),
        fork(watchUpdateUser),
        fork(watchDeleteUser),
        // fork(watchGetCertificates),
        // fork(watchGetConfirmationCertficates),
        // fork(watchGetInternShipLetter),
    ]);

    
}

export default userSagas;
