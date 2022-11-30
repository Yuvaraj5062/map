import {GET_TEAMLEAD_LIST_REQUEST,  SET_TEAMLEAD_LIST_REQUEST} from './constants'

const INIT_STATE = {
    teamlead: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_TEAMLEAD_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_TEAMLEAD_LIST_REQUEST:
            return{
                ...state,
                teamlead: action.payload,
                loading:false
            };
        default:
            return state;
    }
};