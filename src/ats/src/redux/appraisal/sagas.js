import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_EREIVEW_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getEmpReviewList (action) {
    try {
        const response = yield  call( api.getEmpReview, action.getEmpcode );
       if (response.data && response.data.Data) {
        yield put( actions.setEmpReview( response.data.Data[0] ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setEmpReview( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetEmpReviewRequest(){
    yield takeEvery( GET_EREIVEW_LIST_REQUEST, getEmpReviewList );
}

function* empReviewSagas() {
    yield all([
        fork( watchGetEmpReviewRequest ),
    ]);
}

export default empReviewSagas;
