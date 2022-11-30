import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_REPORTING_MAN_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getReportingManList () {
    try {
        const response = yield  call( api.getReportingMan );
       if (response.data && response.data.Data) {
        yield put( actions.setReportingMan( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setReportingMan( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setReportingMan( action ){
//     try {
//         const result = yield call( api.setReportingMan, action.payload );
//         yield put( actions.setReportingMan( result.data ) );
//         yield call( getReportingManList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetReportingManRequest(){
    yield takeEvery( GET_REPORTING_MAN_LIST_REQUEST, getReportingManList );
}

function* reportingManSagas() {
    yield all([
        fork( watchGetReportingManRequest ),
    ]);
}

export default reportingManSagas;
