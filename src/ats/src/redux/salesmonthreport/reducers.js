import {GET_MONTH_LIST_REQUEST,  SET_MONTH_LIST_REQUEST, ADD_MONTH_REQUEST, GET_ERROR} from './constants'

const INIT_STATE = {
    months: [],
    month:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_MONTH_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_MONTH_LIST_REQUEST:
            return{
                ...state,
                months: action.payload,
                loading:false
            };
            case  ADD_MONTH_REQUEST:
            return{
                ...state,
                month: action.payload,
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