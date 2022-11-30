import {GET_EREIVEW_LIST_REQUEST,  SET_EREIVEW_LIST_REQUEST} from './constants'

const INIT_STATE = {
    empreivew: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_EREIVEW_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_EREIVEW_LIST_REQUEST:
            return{
                ...state,
                empreivew: action.payload,
                loading:false
            };
        default:
            return state;
    }
};