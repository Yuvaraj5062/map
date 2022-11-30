import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_BIRTHDAY_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getBirthdayList () {
    try {
        const response = yield  call( api.getBirthday );
       if (response.data && response.data.Data) {
        yield put( actions.setBirthday( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setBirthday( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setBirthday( action ){
//     try {
//         const result = yield call( api.setBirthday, action.payload );
//         yield put( actions.setBirthday( result.data ) );
//         yield call( getBirthdayList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetBirthdayRequest(){
    yield takeEvery( GET_BIRTHDAY_LIST_REQUEST, getBirthdayList );
}

function* birthdaySagas() {
    yield all([
        fork( watchGetBirthdayRequest ),
    ]);
}

export default birthdaySagas;
