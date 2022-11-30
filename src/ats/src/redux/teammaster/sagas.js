import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    CREATE_TEAM,
    DELETE_TEAM,
    GET_TEAM_LIST_REQUEST,
    UPDATE_TEAM,
    //SET_TEAM_LIST_REQUEST
} from './constants'


function* getTeamList () {
    try {
        const response = yield  call( api.getTeamList );
       if (response.data && response.data.Data) {
        yield put( actions.setTeam( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setTeam( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* setTeam( action ){
   // //console.log('called');
    try {
        //const result = yield call( api.setTeam, action.payload );
        //yield put( actions.createTeamSuccess( result.data ) );
        yield call( getTeamList );
        
        ////console.log(result); 

    } catch (error) {
        //console.log(error);
        swal(error, "error");
    }
}

function* updateTeam( action ){
    try {
        const result = yield call( api.updateTeam, action.payload );
        yield put( actions.setUpdateTeam( result.data ) );
        yield call( getTeamList );
        yield put( actions.hideTeamModal() );
       // //console.log(result.data);
       swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
        swal("Failed", error.response.data.Message,'error');
    }
}

function* deleteTeam( action ){
    try {
        //console.log(">>>>>>>> id", action)
        const result = yield call( api.deleteTeam, action.id);
        yield put( actions.setUpdateTeam( result.data ) );
        yield call( getTeamList );
        // yield put( actions.hideTeamModal() );
       //console.log(result.data);
       swal(result.data.Status==true?'Success':'Failed', result.data.Message, result.data.Status==true?'success':'error');
    } catch (error) {
      // //console.log("error",error.response);
        swal("Failed", error.response.data.Message,'error');
       // swal();
    }
}
function* watchGetTeamRequest(){
    yield takeEvery( GET_TEAM_LIST_REQUEST, getTeamList );
}
function* watchSetTeamRequest(){
    yield takeEvery( CREATE_TEAM, setTeam );
}
function* watchSetTeamUpdate(){
    yield takeEvery( UPDATE_TEAM, updateTeam );
}
function* watchSetTeamDelete(){
    yield takeEvery( DELETE_TEAM, deleteTeam );
}
function* teamSagas() {
    yield all([
        fork( watchGetTeamRequest ),
        fork( watchSetTeamRequest ),
        fork(watchSetTeamUpdate),
        fork(watchSetTeamDelete)
    ]);
}

export default teamSagas;
