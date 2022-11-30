import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_PROFILE_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
    SET_PROFILE_IMAGE_REQUEST
} from './constants'


function* getProfileList (action) {
    try {
        const response = yield  call( api.getUserProfile, action.id );
       if (response.data && response.data.Data) {
        yield put( actions.setProfile( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setProfile( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}

function* setProfileImage( action ){
    try {
        const response = yield call( api.setProfileImage,action.payload );   
        if(response.status===200){
            //console.log("action",action.payload.userid)
            const response = yield  call( api.getUserProfile, action.payload.userid );
            if (response.data && response.data.Data) {
             yield put( actions.setProfile( response.data.Data ) );
            }
        }
    } catch (error) {
        //console.log(error);
       
    }
}

function* watchUpdateUser(){
    yield takeEvery( SET_PROFILE_IMAGE_REQUEST, setProfileImage );
}
function* watchGetProfileRequest(){
    yield takeEvery( GET_PROFILE_LIST_REQUEST, getProfileList );
}


function* profileSagas() {
    yield all([
        fork( watchGetProfileRequest ),
        fork(watchUpdateUser),
    ]);
}

export default profileSagas;
