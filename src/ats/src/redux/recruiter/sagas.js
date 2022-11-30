import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_RECRUITER_LIST_REQUEST,
   // SET_RECRUITER_LIST_REQUEST
} from './constants'


function* getRecruiterList () {
    try {
        const response = yield  call( api.getRecruiterList );
       if (response.data && response.data.Data) {
        yield put( actions.setRecruiter( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setRecruiter( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setRecruiter( action ){
//     try {
//         const result = yield call( api.setRecruiter, action.payload );
//         yield put( actions.setRecruiter( result.data ) );
//         yield call( getRecruiterList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetRecruiterRequest(){
    yield takeEvery( GET_RECRUITER_LIST_REQUEST, getRecruiterList );
}

function* recruiterSagas() {
    yield all([
        fork( watchGetRecruiterRequest ),
    ]);
}

export default recruiterSagas;
