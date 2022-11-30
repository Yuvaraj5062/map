import {GET_PENDING_APPROVAL_REQUEST, SET_PENDING_APPROVAL_REQUEST,
  GET_PENDING_OFFER_REQUEST, SET_PENDING_OFFER_REQUEST,
  GET_ACTIVE_REQUIREMENT_REQUEST, SET_ACTIVE_REQUIREMENT_REQUEST,
  GET_DEACTIVE_REQUIREMENT_REQUEST, SET_DEACTIVE_REQUIREMENT_REQUEST,
      } from './constants';


export const getPendingApprovalList =(username)=>({
  type:GET_PENDING_APPROVAL_REQUEST,
  username:username
})

export const setPendingApproval = ( pendingapproval ) => ( {
  type: SET_PENDING_APPROVAL_REQUEST,
  payload: pendingapproval
} );
export const getPendingOfferList =(username)=>({
  type:GET_PENDING_OFFER_REQUEST,
  username:username
})

export const setPendingOffer = ( pendingoffer ) => ( {
  type: SET_PENDING_OFFER_REQUEST,
  payload: pendingoffer
} );

export const getActiveRequirementList =()=>({
  type:GET_ACTIVE_REQUIREMENT_REQUEST
})

export const setActiveRequirement = ( activerequiremenet ) => ( {
  type: SET_ACTIVE_REQUIREMENT_REQUEST,
  payload: activerequiremenet
} );
export const getDeActiveRequirementList =()=>({
  type:GET_DEACTIVE_REQUIREMENT_REQUEST
})

export const setDeActiveRequirement = ( deactiverequiremenet ) => ( {
  type: SET_DEACTIVE_REQUIREMENT_REQUEST,
  payload: deactiverequiremenet
} );