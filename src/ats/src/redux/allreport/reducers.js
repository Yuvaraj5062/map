import {GET_RPR_LIST_REQUEST,  SET_RPR_LIST_REQUEST, GET_DATEWISE_LIST_REQUEST, SET_DATEWISE_LIST_REQUEST,
GET_MONTHCOUNT_LIST_REQUEST, SET_MONTHCOUNT_LIST_REQUEST, GET_TODAY_LIST_REQUEST, SET_TODAY_LIST_REQUEST,
GET_REVENU_LIST_REQUEST, SET_REVENU_LIST_REQUEST} from './constants'

const INIT_STATE = {
    reqreport: [],
    datewsiereport: [],
    loading:false,
    monthcountreport:[],
    todayrepoert:[],
    revenureport:[],
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_RPR_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_RPR_LIST_REQUEST:
            return{
                ...state,
                reqreport: action.payload,
                loading:false
            };
            case GET_DATEWISE_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_DATEWISE_LIST_REQUEST:
            return{
                ...state,
                datewsiereport: action.payload,
                loading:false
            };
            case GET_MONTHCOUNT_LIST_REQUEST:
                return{
                    ...state,
                    //requirement: action.payload,
                    loading:true
                };
            case  SET_MONTHCOUNT_LIST_REQUEST:
                return{
                    ...state,
                    monthcountreport: action.payload,
                    loading:false
                };
                case GET_TODAY_LIST_REQUEST:
                return{
                    ...state,
                    //requirement: action.payload,
                    loading:true
                };
            case  SET_TODAY_LIST_REQUEST:
                return{
                    ...state,
                    todayrepoert: action.payload,
                    loading:false
                };
                case GET_REVENU_LIST_REQUEST:
                    return{
                        ...state,
                        //requirement: action.payload,
                        loading:true
                    };
                case  SET_REVENU_LIST_REQUEST:
                    return{
                        ...state,
                        revenureport: action.payload,
                        loading:false
                    };
        default:
            return state;
    }
};