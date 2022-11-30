import {GET_ATTENDANCE_LIST_REQUEST,  SET_ATTENDANCE_LIST_REQUEST} from './constants'

const INIT_STATE = {
    attendance: [],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_ATTENDANCE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_ATTENDANCE_LIST_REQUEST:
            return{
                ...state,
                attendance: action.payload,
                loading:false
            };
        default:
            return state;
    }
};