import {GET_REPORTING_MAN_LIST_REQUEST,  SET_REPORTING_MAN_LIST_REQUEST} from './constants'

const INIT_STATE = {
    reportingmanager: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_REPORTING_MAN_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_REPORTING_MAN_LIST_REQUEST:
            return{
                ...state,
                reportingmanager: action.payload,
                loading:false
            };
        default:
            return state;
    }
};