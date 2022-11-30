import {GET_REQUIREMENTS_LIST_REQUEST, SET_REQUIREMENTS_LIST_REQUEST,
  SAVE_REQUIREMENTS, SET_SAVE_REQUIREMENTS,
  GET_CRITICAL_REQUIREMENTS_LIST, SET_CRITICAL_REQUIREMENTS_LIST,
  GET_REQUIREMENTS_MODAL, UPDATE_REQUIREMNT,
  HIDE_REQUIREMENTS_MODAL} from './constants';


export const getRequirementList =()=>({
  type:GET_REQUIREMENTS_LIST_REQUEST
})

export const setRequirement = ( requirements ) => ( {
  type: SET_REQUIREMENTS_LIST_REQUEST,
  payload: requirements
} );
export const getCriticalRequirementList =()=>({
  type:GET_CRITICAL_REQUIREMENTS_LIST
})

export const setCriticalRequirement = ( criticalreq ) => ( {
  type: SET_CRITICAL_REQUIREMENTS_LIST,
  payload: criticalreq
} );

export const saveRequirement =()=>({
  type:SAVE_REQUIREMENTS
})

export const setSaveRequirement = ( requirement ) => ( {
  type: SET_SAVE_REQUIREMENTS,
  payload: requirement
} );
export const updateRequirement= ( requirement ) => ( {
  type: UPDATE_REQUIREMNT,
  payload: requirement
} );
export const getRequirementModal = () => ( {
  type: GET_REQUIREMENTS_MODAL
} );

export const hideRequirementModal = () => ( {
  type: HIDE_REQUIREMENTS_MODAL
} );