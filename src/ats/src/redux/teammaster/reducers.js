import {CREATE_TEAM_SUCCESS, GET_TEAM_LIST_REQUEST,  GET_TEAM_MODAL,  HIDE_TEAM_MODAL,  SET_TEAM,  SET_TEAM_LIST_REQUEST} from './constants'

const INIT_STATE = {
    teams: [],
    createteam:{},
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_TEAM_LIST_REQUEST:
            return{
                ...state,
                //requirement: action.payload,
                loading:true
            };
        case  SET_TEAM_LIST_REQUEST:
            return{
                ...state,
                teams: action.payload,
                loading:false
            };
            case  CREATE_TEAM_SUCCESS:
                return{
                    ...state,
                    createteam: action.payload,
                    loading:false
                };
            case  SET_TEAM:
            return{
                ...state,
                team: action.payload,
                loading:false
            };
            case GET_TEAM_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_TEAM_MODAL:
                return{
                    ...state,
                    team: null,
                    modal: false
                }
        default:
            return state;
    }
};