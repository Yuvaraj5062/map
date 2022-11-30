import {CREATE_TEAM, CREATE_TEAM_SUCCESS, DELETE_TEAM, GET_TEAM_LIST_REQUEST, 
   GET_TEAM_MODAL, 
   HIDE_TEAM_MODAL, 
   SET_TEAM, 
   SET_TEAM_LIST_REQUEST,
   UPDATE_TEAM,} from './constants';


export const getTeamList =()=>({
  type:GET_TEAM_LIST_REQUEST
})

export const setTeam = ( teams ) => ( {
  type: SET_TEAM_LIST_REQUEST,
  payload: teams
} );
export const createTeam = ( createteam ) => ( {
  type: CREATE_TEAM,
  payload: createteam
} );
export const createTeamSuccess = ( createteam ) => ( {
  type: CREATE_TEAM_SUCCESS,
  payload: createteam
} );

export const setUpdateTeam = ( team ) => ( {
  type: SET_TEAM,
  payload: team
} );

export const updateTeam =  (team) => ({
  type: UPDATE_TEAM,
  payload: team
})

export const deleteTeam =  (TeamId) => ({
  type: DELETE_TEAM,
  id: TeamId
})

export const getTeamModal = () => ( {
  type: GET_TEAM_MODAL
} );

export const hideTeamModal = () => ( {
  type: HIDE_TEAM_MODAL
} );