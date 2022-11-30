import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import {
    ADD_MONTH,
    GET_MONTH_LIST_REQUEST,
    //SET_MONTH_LIST_REQUEST
} from './constants'


function* getMonthList () {
    try {
        const response = yield  call( api.getMonthList );
       if (response.data && response.data.Data) {
        yield put( actions.getMonth( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getMonth( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setMonth( action ){
    try {
       //const result = yield call( api.setMonth, action.payload );
       // yield put( actions.setMonthRquest( result.data ) );
        yield call( getMonthList );
        ////console.log(result.data);
        //swal("Record Created Successful", "success"); 
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetMonthRequest(){
    yield takeEvery( GET_MONTH_LIST_REQUEST, getMonthList );
}
function* watchSetMonth(){
    yield takeEvery( ADD_MONTH, setMonth );
}
function* monthSagas() {
    yield all([
        fork( watchGetMonthRequest ),
        fork( watchSetMonth ),
    ]);
}

export default monthSagas;
