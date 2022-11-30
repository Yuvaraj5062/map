import { CREATE_ROLE_SUCCESS, GET_ROLE_LIST_REQUEST,  SET_ROLE_LIST_REQUEST} from './constants'

const INIT_STATE = {
    role: [],
    loading:false,
    createrole:{},
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_ROLE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_ROLE_LIST_REQUEST:
            return{
                ...state,
                role: action.payload,
                loading:false
            };
            case  CREATE_ROLE_SUCCESS:
            return{
                ...state,
                createrole: action.payload,
                loading:false
            };
        default:
            return state;
    }
};