
import {GET_REQUIREMENT_LIST_REQUEST, 
  SET_REQUIREMENT_LIST_REQUEST, ADD_REQUIREMENT, ADD_REQUIREMENT_REQUEST, GET_REQUIREMENT_MODAL,HIDE_REQUIREMENT_MODAL, GET_REQUIREMENT_DELETE_MODAL, HIDE_REQUIREMENT_DELETE_MODAL, GET_ERROR, UPDATE_REQUIREMENT, DELETE_REQUIREMENT} from './constants';


export const getReqList =()=>({
 type:GET_REQUIREMENT_LIST_REQUEST,
 
})

export const getReq = ( reqs ) => ( {
 type: SET_REQUIREMENT_LIST_REQUEST,
 payload: reqs
} );

export const setReq = ( req ) => ( {
 type: ADD_REQUIREMENT,
 payload: req
} );

export const updateReq =  (req) => ({
 type: UPDATE_REQUIREMENT,
 payload: req
})

export const deleteReq =  (req) => ({
 type: DELETE_REQUIREMENT,
 payload: req
})

export const setReqRquest = ( req ) => ( {
 type: ADD_REQUIREMENT_REQUEST,
 payload: req
} );
export const getReqModal = () => ( {
 type: GET_REQUIREMENT_MODAL
} );

export const hideReqModal = () => ( {
 type: HIDE_REQUIREMENT_MODAL
} );

export const getReqDeleteModal = () => ( {
 type: GET_REQUIREMENT_DELETE_MODAL
} );

export const hideReqDeleteModal = () => ( {
 type: HIDE_REQUIREMENT_DELETE_MODAL
} );


export const getError = ( error ) => ( {
 type: GET_ERROR,
 payload: error
} );