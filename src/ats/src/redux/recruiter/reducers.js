import {GET_RECRUITER_LIST_REQUEST,  SET_RECRUITER_LIST_REQUEST} from './constants'
const INIT_STATE = {
    recruiters: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_RECRUITER_LIST_REQUEST: 
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_RECRUITER_LIST_REQUEST:
            return{
                ...state,
                recruiters: action.payload,
                loading:false
            };
        default:
            return state;
    }
};