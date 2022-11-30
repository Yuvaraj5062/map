import {GET_REVENUE_LIST_REQUEST,  SET_REVENUE_LIST_REQUEST, ADD_REVENUE_REQUEST, GET_ERROR} from './constants'

const INIT_STATE = {
    revenues: [],
    revenue:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_REVENUE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_REVENUE_LIST_REQUEST:
            return{
                ...state,
                revenues: action.payload,
                loading:false
            };
            case  ADD_REVENUE_REQUEST:
            return{
                ...state,
                revenue: action.payload,
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