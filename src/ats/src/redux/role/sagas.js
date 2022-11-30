import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    CREATE_ROLE,
    //CREATE_ROLE_SUCCESS,
    GET_ROLE_LIST_REQUEST,
    //SET_ROLE_LIST_REQUEST
} from './constants'


function* getRoleList () {
    try {
        const response = yield  call( api.getRoleList );
       if (response.data && response.data.Data) {
        yield put( actions.getRolelistRequest( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.getRolelistRequest( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* createRole( action ){
    try {
        //const result = yield call( api.createRole, action.payload );
       // yield put( actions.createRoleSuccess( result.data ) );
        yield call( getRoleList );
       // swal("Record Created Successful", "success"); 
       // //console.log(result.data);
    } catch (error) {
        //console.log(error);
        swal(error, "error");
       
    }
}
function* watchGetRoleRequest(){
    yield takeEvery( GET_ROLE_LIST_REQUEST, getRoleList );
}
function* watchSetRoleRequest(){
    yield takeEvery( CREATE_ROLE, createRole );
}

function* roleSagas() {
    yield all([
        fork( watchGetRoleRequest ),
        fork( watchSetRoleRequest ),
    ]);
}

export default roleSagas;
