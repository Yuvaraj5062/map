import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_TEAMLEAD_LIST_REQUEST,
    //SET_CLIENT_LIST_REQUEST
} from './constants'


function* getTeamLeadList () {
    try {
        const response = yield  call( api.getTeamLead );
       if (response.data && response.data.Data) {
        yield put( actions.setTeamLead( response.data.Data ) );
        ////console.log(response.data, "Require saga working")
       }
       else{
        yield put( actions.setTeamLead( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
// function* setTeamLead( action ){
//     try {
//         const result = yield call( api.setTeamLead, action.payload );
//         yield put( actions.setTeamLead( result.data ) );
//         yield call( getTeamLeadList );
//     } catch (error) {
//         //console.log(error);
       
//     }
// }
function* watchGetTeamLeadRequest(){
    yield takeEvery( GET_TEAMLEAD_LIST_REQUEST, getTeamLeadList );
}

function* teamLeadSagas() {
    yield all([
        fork( watchGetTeamLeadRequest ),
    ]);
}

export default teamLeadSagas;
