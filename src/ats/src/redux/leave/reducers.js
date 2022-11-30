import {GET_LEAVE_LIST_REQUEST,  SET_LEAVE_LIST_REQUEST,
    GET_LEAVE_BALANCE_LIST_REQUEST,  SET_LEAVE_BALANCE_LIST_REQUEST} from './constants'

const INIT_STATE = {
    leave: [],
    leavebalance: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_LEAVE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_LEAVE_LIST_REQUEST:
            return{
                ...state,
                leave: action.payload,
                loading:false
            };
            case GET_LEAVE_BALANCE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_LEAVE_BALANCE_LIST_REQUEST:
            return{
                ...state,
                leavebalance: action.payload,
                loading:false
            };
        default:
            return state;
    }
};