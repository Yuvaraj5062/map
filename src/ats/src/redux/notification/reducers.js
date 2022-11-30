import {GET_NOTIFY_LIST_REQUEST,  SET_NOTIFY_LIST_REQUEST,GET_NEW_NOTIFY_LIST_REQUEST,  SET_NEW_NOTIFY_LIST_REQUEST} from './constants'

const INIT_STATE = {
    notification: [],
    newnotification: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_NOTIFY_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_NOTIFY_LIST_REQUEST:
            return{
                ...state,
                notification: action.payload,
                loading:false
            };
            case GET_NEW_NOTIFY_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_NEW_NOTIFY_LIST_REQUEST:
            return{
                ...state,
                newnotification: action.payload,
                loading:false
            };
        default:
            return state;
    }
};