import {GET_SALESUSER_LIST_REQUEST,  SET_SALESUSER_LIST_REQUEST} from './constants'
const INIT_STATE = {
    salesuser: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_SALESUSER_LIST_REQUEST: 
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_SALESUSER_LIST_REQUEST:
            return{
                ...state,
                salesuser: action.payload,
                loading:false
            };
        default:
            return state;
    }
};