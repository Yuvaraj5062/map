import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_HOLIDAY_LIST_REQUEST,
    ADD_HOLIDAY
} from './constants'


function* getHolidayList () {
    try {
        const response = yield  call( api.getHoliday );
       if (response.data && response.data.Data) {
        yield put( actions.getHoliday( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getHoliday( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setHoliday( action ){
    try {
        const result = yield call( api.setHoliday, action.payload );
        yield put( actions.setHolidayRquest( result.data ) );
        yield call( getHolidayList );
        //console.log(result.data);
        swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        //console.log(error);
        swal(error, "error");
       
    }
}
function* watchGetHolidayRequest(){
    yield takeEvery( GET_HOLIDAY_LIST_REQUEST, getHolidayList );
}
function* watchSetHolidayRequest(){
    yield takeEvery( ADD_HOLIDAY, setHoliday );
}
function* holidaySagas() {
    yield all([
        fork( watchGetHolidayRequest ),
        fork( watchSetHolidayRequest ),
    ]);
}

export default holidaySagas;
