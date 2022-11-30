import {GET_DATE_SUBMISSION_REQUEST,  SET_DATE_SUBMISSION_REQUEST,
       GET_DATE_INTERVIEW_REQUEST,  SET_DATE_INTERVIEW_REQUEST,
       GET_DATE_OFFER_REQUEST,  SET_DATE_OFFER_REQUEST,
       GET_DATE_HIRE_REQUEST,  SET_DATE_HIRE_REQUEST,
    } from './constants'

const INIT_STATE = {
    datesubmission: [],
    dateinterview:[],
    dateoffer:[],
    datehire:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_DATE_SUBMISSION_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_DATE_SUBMISSION_REQUEST:
            return{
                ...state,
                datesubmission: action.payload,
                loading:false
            };
            case GET_DATE_INTERVIEW_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_DATE_INTERVIEW_REQUEST:
                return{
                    ...state,
                    dateinterview: action.payload,
                    loading:false
                };
                case GET_DATE_OFFER_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_DATE_OFFER_REQUEST:
                    return{
                        ...state,
                        dateoffer: action.payload,
                        loading:false
                    };
                    case GET_DATE_HIRE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_DATE_HIRE_REQUEST:
                    return{
                        ...state,
                        datehire: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};