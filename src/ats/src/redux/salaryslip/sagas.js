// import { useSelector } from 'react-redux';
import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
//import swal from 'sweetalert';
import { GET_SALARY_SLIP_REQUEST } from './constants'


function* getSalarySlipList (action) {
    try {
        // let payload = useSelector((state) => state.SalarySlip.payload);
        const response = yield call( api.getSalarySlips, action.payload);
       if (response.data && response.data.Data) {
        yield put( actions.setSalarySlips( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setSalarySlips( [] ) );
       }
    } catch (error) {
        if(error.response.status === 404){
            swal("Not Found", "Salary slips were not found", "error");
            yield put( actions.setSalarySlips( [] ) );
        }
    }
}

function* watchGetSalarySlips(){
    yield takeEvery( GET_SALARY_SLIP_REQUEST, getSalarySlipList );
}
function* salarySlipSagas() {
    yield all([
        fork( watchGetSalarySlips ),
    ]);
}

export default salarySlipSagas;
