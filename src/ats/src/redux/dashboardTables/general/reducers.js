import {GET_PENDING_APPROVAL_REQUEST,  SET_PENDING_APPROVAL_REQUEST,
    GET_PENDING_OFFER_REQUEST,  SET_PENDING_OFFER_REQUEST,
    GET_ACTIVE_REQUIREMENT_REQUEST,  SET_ACTIVE_REQUIREMENT_REQUEST,
    GET_DEACTIVE_REQUIREMENT_REQUEST,  SET_DEACTIVE_REQUIREMENT_REQUEST,
    } from './constants'

const INIT_STATE = {
    pendingapproval: [],
    pendingoffer: [],
    activerequiremenet:[],
    deactiverequiremenet:[],
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_PENDING_APPROVAL_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_PENDING_APPROVAL_REQUEST:
            return{
                ...state,
                pendingapproval: action.payload,
                loading:false
            };
            case GET_PENDING_OFFER_REQUEST:
            return{
                ...state,
                loading:true
            };
        case  SET_PENDING_OFFER_REQUEST:
            return{
                ...state,
                pendingoffer: action.payload,
                loading:false
            };
            case GET_ACTIVE_REQUIREMENT_REQUEST:
                return{
                    ...state,
                    loading:true
                };
            case  SET_ACTIVE_REQUIREMENT_REQUEST:
                return{
                    ...state,
                    activerequiremenet: action.payload,
                    loading:false
                };
                case GET_DEACTIVE_REQUIREMENT_REQUEST:
                    return{
                        ...state,
                        loading:true
                    };
                case  SET_DEACTIVE_REQUIREMENT_REQUEST:
                    return{
                        ...state,
                        deactiverequiremenet: action.payload,
                        loading:false
                    };
           
        default:
            return state;
    }
};