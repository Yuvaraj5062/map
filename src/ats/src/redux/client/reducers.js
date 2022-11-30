import {ADD_CLIENT, CREATE_CLIENT_SUCCESS, GET_CLIENT_LIST_REQUEST,  GET_CLIENT_MODAL,  HIDE_CLIENT_MODAL,  SET_CLIENT_LIST_REQUEST} from './constants'

const INIT_STATE = {
    clients: [],
    createclients:{},
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_CLIENT_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_CLIENT_LIST_REQUEST:
            return{
                ...state,
                clients: action.payload,
                loading:false
            };
            case  CREATE_CLIENT_SUCCESS:
            return{
                ...state,
                createclients: action.payload,
                loading:false
            };
            case  ADD_CLIENT:
            return{
                ...state,
                client: action.payload,
                loading:false
            };
            case GET_CLIENT_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_CLIENT_MODAL:
                return{
                    ...state,
                    client: null,
                    modal: false
                }
        default:
            return state;
    }
};