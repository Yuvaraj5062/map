import {
    GET_DT_LIST_REQUEST,
    SET_DT_LIST_REQUEST,
    GET_TOIN_LIST_REQUEST,
    SET_TOIN_LIST_REQUEST,
    GET_MONOF_LIST_REQUEST,
    SET_MONOF_LIST_REQUEST,
    GET_MONTHJOIN_LIST_REQUEST,
    SET_MONTHJOIN_LIST_REQUEST,
    GET_ATSACTI_LIST_REQUEST,
    SET_ATSACTI_LIST_REQUEST,
    GET_ATSGRAPH_LIST_REQUEST,
    SET_ATSGRAPH_LIST_REQUEST
} from './constants';

const INIT_STATE = {
    dailytarget: [],
    todaysinterview: [],
    monthoffer:[],
    monthtobejoin:[],
    atsactivity:[],
    graphlist:[],
    loading: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_DT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SET_DT_LIST_REQUEST:
            return {
                ...state,
                dailytarget: action.payload,
                loading: false,
            };
        case GET_TOIN_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SET_TOIN_LIST_REQUEST:
            return {
                ...state,
                todaysinterview: action.payload,
                loading: false,
            };
            case GET_MONOF_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SET_MONOF_LIST_REQUEST:
            return {
                ...state,
                monthoffer: action.payload,
                loading: false,
            };
            case GET_MONTHJOIN_LIST_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case SET_MONTHJOIN_LIST_REQUEST:
                return {
                    ...state,
                    monthtobejoin: action.payload,
                    loading: false,
                };
                case GET_ATSACTI_LIST_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case SET_ATSACTI_LIST_REQUEST:
                return {
                    ...state,
                    atsactivity: action.payload,
                    loading: false,
                };
            case GET_ATSGRAPH_LIST_REQUEST:
                return {
                    ...state,
                    loading: true,
                };

                case SET_ATSGRAPH_LIST_REQUEST:
                return {
                    ...state,
                    graphlist: action.payload,
                    loading: false,
                };
        default:
            return state;
    }
};
