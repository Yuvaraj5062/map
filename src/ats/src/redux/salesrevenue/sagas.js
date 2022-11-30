import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import {
    ADD_REVENUE,
    GET_REVENUE_LIST_REQUEST,
    //SET_Revenue_LIST_REQUEST
} from './constants'


function* getRevenueList () {
    try {
        const response = yield  call( api.getRevenueList );
       if (response.data && response.data.Data) {
        yield put( actions.getRevenue( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getRevenue( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setRevenue( action ){
    try {
      //  const result = yield call( api.setRevenue, action.payload );
       // yield put( actions.setRevenueRquest( result.data ) );
        yield call( getRevenueList );
       // //console.log(result.data);
       // swal("Record Created Successful", "success"); 
    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}
function* watchGetRevenueRequest(){
    yield takeEvery( GET_REVENUE_LIST_REQUEST, getRevenueList );
}
function* watchSetRevenue(){
    yield takeEvery( ADD_REVENUE, setRevenue );
}
function* revenueSagas() {
    yield all([
        fork( watchGetRevenueRequest ),
        fork( watchSetRevenue ),
    ]);
}

export default revenueSagas;
