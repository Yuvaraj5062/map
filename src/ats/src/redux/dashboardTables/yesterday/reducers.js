import {GET_YESTERDAY_SUBMISSION_REQUEST,  SET_YESTERDAY_SUBMISSION_REQUEST,
       GET_YESTERDAY_INTERVIEW_REQUEST,  SET_YESTERDAY_INTERVIEW_REQUEST,
       GET_YESTERDAY_OFFER_REQUEST,  SET_YESTERDAY_OFFER_REQUEST,
       GET_YESTERDAY_HIRE_REQUEST,  SET_YESTERDAY_HIRE_REQUEST,
    } from './constants'

const INIT_STATE = {
    yesterdaysubmission: [],
    yesterdayinterview:[],
    yesterdayoffer:[],
    yesterdayhire:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_YESTERDAY_SUBMISSION_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_YESTERDAY_SUBMISSION_REQUEST:
            return{
                ...state,
                yesterdaysubmission: action.payload,
                loading:false
            };
            case GET_YESTERDAY_INTERVIEW_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_YESTERDAY_INTERVIEW_REQUEST:
                return{
                    ...state,
                    yesterdayinterview: action.payload,
                    loading:false
                };
                case GET_YESTERDAY_OFFER_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_YESTERDAY_OFFER_REQUEST:
                    return{
                        ...state,
                        yesterdayoffer: action.payload,
                        loading:false
                    };
                    case GET_YESTERDAY_HIRE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_YESTERDAY_HIRE_REQUEST:
                    return{
                        ...state,
                        yesterdayhire: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};