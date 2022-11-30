import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_SALESUSER_LIST_REQUEST,
   // SET_SALESUSER_LIST_REQUEST
} from './constants'


function* getSalesUserList () {
    try {
        const response = yield  call( api.getSalesUserList );
       if (response.data && response.data.Data) {
        yield put( actions.setSalesUser( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setSalesUser( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setSalesUser( action ){
//     try {
//         const result = yield call( api.setSalesUser, action.payload );
//         yield put( actions.setSalesUser( result.data ) );
//         yield call( getSalesUserList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetSalesUserRequest(){
    yield takeEvery( GET_SALESUSER_LIST_REQUEST, getSalesUserList );
}

function* salesUserSagas() {
    yield all([
        fork( watchGetSalesUserRequest ),
    ]);
}

export default salesUserSagas;
