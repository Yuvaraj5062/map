import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_ATTENDANCE_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getAttendanceList () {
    try {
        const response = yield  call( api.getAttendance );
       if (response.data && response.data.Data) {
        yield put( actions.setAttendance( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setAttendance( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setAttendance( action ){
//     try {
//         const result = yield call( api.setAttendance, action.payload );
//         yield put( actions.setAttendance( result.data ) );
//         yield call( getAttendanceList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetAttendanceRequest(){
    yield takeEvery( GET_ATTENDANCE_LIST_REQUEST, getAttendanceList );
}

function* attendanceHrSagas() {
    yield all([
        fork( watchGetAttendanceRequest ),
    ]);
}

export default attendanceHrSagas;
