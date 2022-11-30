import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import {
    CREATE_PASS,
    //SET_TEAM_LIST_REQUEST
} from './constants'



function* setTeam( ){
    try {
        
        //console.log("call");

    } catch (error) {
        //console.log(error);
    }
}

function* watchSetTeamRequest(){
    yield takeEvery( CREATE_PASS, setTeam );
}
function* teamSagas() {
    yield all([
        fork( watchSetTeamRequest ),
    ]);
}

export default teamSagas;
