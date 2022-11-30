import {GET_WEEK_SUBMISSION_REQUEST,  SET_WEEK_SUBMISSION_REQUEST,
       GET_WEEK_INTERVIEW_REQUEST,  SET_WEEK_INTERVIEW_REQUEST,
       GET_WEEK_OFFER_REQUEST,  SET_WEEK_OFFER_REQUEST,
       GET_WEEK_HIRE_REQUEST,  SET_WEEK_HIRE_REQUEST,
    } from './constants'

const INIT_STATE = {
    weeksubmission: [],
    weekinterview:[],
    weekoffer:[],
    weekhire:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_WEEK_SUBMISSION_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_WEEK_SUBMISSION_REQUEST:
            return{
                ...state,
                weeksubmission: action.payload,
                loading:false
            };
            case GET_WEEK_INTERVIEW_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_WEEK_INTERVIEW_REQUEST:
                return{
                    ...state,
                    weekinterview: action.payload,
                    loading:false
                };
                case GET_WEEK_OFFER_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_WEEK_OFFER_REQUEST:
                    return{
                        ...state,
                        weekoffer: action.payload,
                        loading:false
                    };
                    case GET_WEEK_HIRE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_WEEK_HIRE_REQUEST:
                    return{
                        ...state,
                        weekhire: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};