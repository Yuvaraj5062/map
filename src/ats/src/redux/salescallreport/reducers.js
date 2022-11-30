import {GET_CALL_LIST_REQUEST,  SET_CALL_LIST_REQUEST, ADD_CALL_REQUEST, GET_ERROR} from './constants'

const INIT_STATE = {
    calls: [],
    call:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_CALL_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_CALL_LIST_REQUEST:
            return{
                ...state,
                calls: action.payload,
                loading:false
            };
            case  ADD_CALL_REQUEST:
            return{
                ...state,
                call: action.payload,
                loading:false
            };
            case GET_ERROR:
                return{
                    ...state,
                    error: action.payload
                };
        default:
            return state;
    }
};