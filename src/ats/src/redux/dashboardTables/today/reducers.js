import {GET_TODAY_SUBMISSION_REQUEST,  SET_TODAY_SUBMISSION_REQUEST,
       GET_TODAY_INTERVIEW_REQUEST,  SET_TODAY_INTERVIEW_REQUEST,
       GET_TODAY_OFFER_REQUEST,  SET_TODAY_OFFER_REQUEST,
       GET_TODAY_HIRE_REQUEST,  SET_TODAY_HIRE_REQUEST,
    } from './constants'

const INIT_STATE = {
    todaysubmission: [],
    todayinterview:[],
    todayoffer:[],
    todayhire:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_TODAY_SUBMISSION_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_TODAY_SUBMISSION_REQUEST:
            return{
                ...state,
                todaysubmission: action.payload,
                loading:false
            };
            case GET_TODAY_INTERVIEW_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_TODAY_INTERVIEW_REQUEST:
                return{
                    ...state,
                    todayinterview: action.payload,
                    loading:false
                };
                case GET_TODAY_OFFER_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_TODAY_OFFER_REQUEST:
                    return{
                        ...state,
                        todayoffer: action.payload,
                        loading:false
                    };
                    case GET_TODAY_HIRE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_TODAY_HIRE_REQUEST:
                    return{
                        ...state,
                        todayhire: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};