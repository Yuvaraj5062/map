import {GET_MONTH_SUBMISSION_REQUEST,  SET_MONTH_SUBMISSION_REQUEST,
       GET_MONTH_INTERVIEW_REQUEST,  SET_MONTH_INTERVIEW_REQUEST,
       GET_MONTH_OFFER_REQUEST,  SET_MONTH_OFFER_REQUEST,
       GET_MONTH_HIRE_REQUEST,  SET_MONTH_HIRE_REQUEST,
    } from './constants'

const INIT_STATE = {
    monthsubmission: [],
    monthinterview:[],
    monthoffer:[],
    monthhire:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_MONTH_SUBMISSION_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_MONTH_SUBMISSION_REQUEST:
            return{
                ...state,
                monthsubmission: action.payload,
                loading:false
            };
            case GET_MONTH_INTERVIEW_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_MONTH_INTERVIEW_REQUEST:
                return{
                    ...state,
                    monthinterview: action.payload,
                    loading:false
                };
                case GET_MONTH_OFFER_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_MONTH_OFFER_REQUEST:
                    return{
                        ...state,
                        monthoffer: action.payload,
                        loading:false
                    };
                    case GET_MONTH_HIRE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_MONTH_HIRE_REQUEST:
                    return{
                        ...state,
                        monthhire: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};