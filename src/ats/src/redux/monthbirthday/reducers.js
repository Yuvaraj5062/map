import {GET_BIRTHDAY_LIST_REQUEST,  SET_BIRTHDAY_LIST_REQUEST} from './constants'

const INIT_STATE = {
    birthday: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_BIRTHDAY_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_BIRTHDAY_LIST_REQUEST:
            return{
                ...state,
                birthday: action.payload,
                loading:false
            };
        default:
            return state;
    }
};