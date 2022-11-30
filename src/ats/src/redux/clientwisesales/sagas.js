import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    CREATE_CWS,
    GET_CWS_LIST_REQUEST,
    //SET_CWS_LIST_REQUEST
} from './constants'


function* getCwsList () {
    try {
        const response = yield  call( api.getCwsList );
       if (response.data && response.data.Data) {
        yield put( actions.setCwsList( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setCwsList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setCws( action ){
    try {
        const result = yield call( api.setCws, action.payload );
        yield put( actions.createCwsSuccess( result.data ) );
        yield call( getCwsList );
        //console.log(result);
        swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetCwsRequest(){
    yield takeEvery( GET_CWS_LIST_REQUEST, getCwsList );
}
function* watchSetCwsRequest(){
    yield takeEvery( CREATE_CWS, setCws );
}


function* cwsSagas() {
    yield all([
        fork( watchGetCwsRequest ),
        fork(watchSetCwsRequest),
    ]);
}

export default cwsSagas;
