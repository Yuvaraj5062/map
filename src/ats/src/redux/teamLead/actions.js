import {GET_TEAMLEAD_LIST_REQUEST, 
   SET_TEAMLEAD_LIST_REQUEST,} from './constants';


export const getTeamLeadList =()=>({
  type:GET_TEAMLEAD_LIST_REQUEST
})

export const setTeamLead = ( teamlead ) => ( {
  type: SET_TEAMLEAD_LIST_REQUEST,
  payload: teamlead
} );