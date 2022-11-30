import {GET_REQUIREMENT_LIST_REQUEST,  SET_REQUIREMENT_LIST_REQUEST, ADD_REQUIREMENT_REQUEST,GET_REQUIREMENT_MODAL,HIDE_REQUIREMENT_MODAL, GET_REQUIREMENT_DELETE_MODAL, HIDE_REQUIREMENT_DELETE_MODAL, GET_ERROR} from './constants'

const INIT_STATE = {
    reqs: [],
    req:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_REQUIREMENT_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_REQUIREMENT_LIST_REQUEST:
            return{
                ...state,
                reqs: action.payload,
                loading:false
            };
            case  ADD_REQUIREMENT_REQUEST:
            return{
                ...state,
                req: action.payload,
                loading:false
            };
            case GET_REQUIREMENT_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_REQUIREMENT_MODAL:
                return{
                    ...state,
                    req: null,
                    modal: false
                }
            case GET_REQUIREMENT_DELETE_MODAL:
                return{
                    ...state,
                    deletemodal: true
                };
            case HIDE_REQUIREMENT_DELETE_MODAL:
                return{
                    ...state,
                    req: null,
                    deletemodal: false
                }
            case GET_ERROR:
                return{
                    ...state,
                    error: action.payload
                };
        default:
            return state;
    }
};