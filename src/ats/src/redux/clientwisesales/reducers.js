import {CREATE_CWS_SUCCESS, GET_CWS_LIST_REQUEST,  SET_CWS_LIST_REQUEST} from './constants'

const INIT_STATE = {
    cws: [],
    createcws:{},
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_CWS_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_CWS_LIST_REQUEST:
            return{
                ...state,
                cws: action.payload,
                loading:false
            };
            case  CREATE_CWS_SUCCESS:
            return{
                ...state,
                createcws: action.payload,
                loading:false
            };
        default:
            return state;
    }
};