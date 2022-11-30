import {GET_REQUIREMENTS_LIST_REQUEST, SET_REQUIREMENTS_LIST_REQUEST,
    GET_CRITICAL_REQUIREMENTS_LIST, SET_CRITICAL_REQUIREMENTS_LIST,
    SAVE_REQUIREMENTS, SET_SAVE_REQUIREMENTS, 
     GET_REQUIREMENTS_MODAL,  HIDE_REQUIREMENTS_MODAL} from './constants'

const INIT_STATE = {
    requirements: [],
    criticalreq:[],
    requirement: {},
    loading:false,
    jid:'',
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_REQUIREMENTS_LIST_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_REQUIREMENTS_LIST_REQUEST:
            return{               
                ...state,
                requirements: action.payload,
                loading:false
            };
            
            case GET_CRITICAL_REQUIREMENTS_LIST:
            return{
                ...state,
                loading:true
            };
        case  SET_CRITICAL_REQUIREMENTS_LIST:
            return{
                ...state,
                criticalreq: action.payload,
                loading:false
            };
            case SAVE_REQUIREMENTS:
            return{
                ...state,
                requirement: action.payload,
                loading:true
            };
        case  SET_SAVE_REQUIREMENTS:
            return{
                ...state,
                requirement: action.payload,
                loading:false
            };
            
            case GET_REQUIREMENTS_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_REQUIREMENTS_MODAL:
                return{
                    ...state,
                    requirement: null,
                    modal: false
                }
        default:
            return state;
    }
};