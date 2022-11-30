import {
    GET_LIST_LIST_REQUEST,
    SET_LIST_LIST_REQUEST,
    GET_OFFER_LIST_REQUEST,
    SET_OFFER_LIST_REQUEST,
    GET_VTBJ_LIST_REQUEST,
    SET_VTBJ_LIST_REQUEST,
    GET_JOIN_LIST_REQUEST,
    SET_JOIN_LIST_REQUEST,
    GET_BD_LIST_REQUEST,
    SET_BD_LIST_REQUEST
} from './constants';

const INIT_STATE = {
    list: [],
    offer: [],
    viewtobejoin:[],
    joinlist:[],
    bdlist:[],
    loading: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_LIST_REQUEST:
            return {
                ...state,
                //list: action.payload,
                loading: true,
            };
        case SET_LIST_LIST_REQUEST:
            return {
                ...state,
                list: action.payload,
                loading: false,
            };
        case GET_OFFER_LIST_REQUEST:
            return {
                ...state,
                //list: action.payload,
                loading: true,
            };
        case SET_OFFER_LIST_REQUEST:
            return {
                ...state,
                offer: action.payload,
                loading: false,
            };
            case GET_VTBJ_LIST_REQUEST:
                return {
                    ...state,
                    //list: action.payload,
                    loading: true,
                };
            case SET_VTBJ_LIST_REQUEST:
                return {
                    ...state,
                    viewtobejoin: action.payload,
                    loading: false,
                };
                case GET_JOIN_LIST_REQUEST:
                    return {
                        ...state,
                        //list: action.payload,
                        loading: true,
                    };
                case SET_JOIN_LIST_REQUEST:
                    return {
                        ...state,
                        joinlist: action.payload,
                        loading: false,
                    };
                    case GET_BD_LIST_REQUEST:
                        return {
                            ...state,
                            //list: action.payload,
                            loading: true,
                        };
                    case SET_BD_LIST_REQUEST:
                        return {
                            ...state,
                            bdlist: action.payload,
                            loading: false,
                        };
        default:
            return state;
    }
};
