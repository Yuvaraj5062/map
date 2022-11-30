import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_DOCS_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getDocsList () {
    try {
        const response = yield  call( api.getDocs );
       // alert('')
       if (response.data && response.data) {
        yield put( actions.setDocs( response.data ) );
     //   //console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setDocs( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setDocs( action ){
//     try {
//         const result = yield call( api.setDocs, action.payload );
//         yield put( actions.setDocs( result.data ) );
//         yield call( getDocsList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetDocsRequest(){
    yield takeEvery( GET_DOCS_LIST_REQUEST, getDocsList );
}

function* docsSagas() {
    yield all([
        fork( watchGetDocsRequest ),
    ]);
}

export default docsSagas;
