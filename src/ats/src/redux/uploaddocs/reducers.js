import {GET_DOCS_LIST_REQUEST,  SET_DOCS_LIST_REQUEST} from './constants'

const INIT_STATE = {
    docs: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_DOCS_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_DOCS_LIST_REQUEST:
            return{
                ...state,
                docs: action.payload,
                loading:false
            };
        default:
            return state;
    }
};