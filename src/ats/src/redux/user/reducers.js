import {GET_USER_LIST_REQUEST,  SET_USER_LIST_REQUEST,
     ADD_USER_REQUEST,GET_USER_MODAL,HIDE_USER_MODAL, 
     GET_USER_DELETE_MODAL, HIDE_USER_DELETE_MODAL,
     GET_CERTFICATE, GET_CONFIRMATIO_LETTER,
     GET_INTERNSHIP_LETTER,GET_ERROR} from './constants'

const INIT_STATE = {
    users: [],
    user:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_USER_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_USER_LIST_REQUEST:
            return{
                ...state,
                users: action.payload,
                loading:false
            };
            case  ADD_USER_REQUEST:
            return{
                ...state,
                user: action.payload,
                loading:false
            };
            case GET_USER_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_USER_MODAL:
                return{
                    ...state,
                    user: null,
                    modal: false
                }
            case GET_USER_DELETE_MODAL:
                return{
                    ...state,
                    deletemodal: true
                };
            case HIDE_USER_DELETE_MODAL:
                return{
                    ...state,
                    user: null,
                    deletemodal: false
                }
            case GET_ERROR:
                return{
                    ...state,
                    error: action.payload
                };

                // case GET_CERTFICATE:
                //     return{
                //         ...state,
                //         //requirement: action.payload,
                //         loading:true
                //     };

                //     case GET_CONFIRMATIO_LETTER:
                //         return{
                //             ...state,
                //             //requirement: action.payload,
                //             loading:true
                //         };

                //         case GET_INTERNSHIP_LETTER:
                //             return{
                //                 ...state,
                //                 //requirement: action.payload,
                //                 loading:true
                //             };

        default:
            return state;
    }
};