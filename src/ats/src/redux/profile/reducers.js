import {GET_PROFILE_LIST_REQUEST,  SET_PROFILE_LIST_REQUEST,SET_PROFILE_IMAGE_REQUEST,
    GET_PROFILE_IMAGE_REQUEST} from './constants'

const INIT_STATE = {
    profile: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_PROFILE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_PROFILE_LIST_REQUEST:
            return{
                ...state,
                profile: action.payload,
                loading:false
            };
            case SET_PROFILE_IMAGE_REQUEST:
            return{
                ...state,
                loading:true
            };
            

        default:
            return state;
    }
};