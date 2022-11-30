import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import {
    ADD_CALL,
    GET_CALL_LIST_REQUEST,
    //SET_CALL_LIST_REQUEST
} from './constants'


function* getCallList (action) {
    try {
        const response = yield  call( api.getCallList, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.getCall( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getCall( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setCall( action ){
    try {
        //const result = yield call( api.setCall, action.payload );
       // yield put( actions.setCallRquest( result.data ) );
        yield call( getCallList );
       // swal("Record Created Successful", "success"); 
       // //console.log(result.data);
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetCallRequest(){
    yield takeEvery( GET_CALL_LIST_REQUEST, getCallList );
}
function* watchSetCall(){
    yield takeEvery( ADD_CALL, setCall );
}
function* callSagas() {
    yield all([
        fork( watchGetCallRequest ),
        fork( watchSetCall ),
    ]);
}

export default callSagas;
