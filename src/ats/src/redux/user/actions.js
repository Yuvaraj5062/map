
import {GET_USER_LIST_REQUEST, 
   SET_USER_LIST_REQUEST, ADD_USER, ADD_USER_REQUEST,
    GET_USER_MODAL,HIDE_USER_MODAL, GET_USER_DELETE_MODAL,
     HIDE_USER_DELETE_MODAL, GET_ERROR,
      UPDATE_USER, DELETE_USER,GET_INTERNSHIP_LETTER,
      GET_CERTFICATE,GET_CONFIRMATIO_LETTER} from './constants';


export const getUserList =()=>({
  type:GET_USER_LIST_REQUEST,
  
})

export const getUser = ( users ) => ( {
  type: SET_USER_LIST_REQUEST,
  payload: users
} );

export const setUser = ( user ) => ( {
  type: ADD_USER,
  payload: user
} );

export const updateUser =  (user) => ({
  type: UPDATE_USER,
  payload: user
})

export const deleteUser =  (user) => ({
  type: DELETE_USER,
  payload: user
})

export const setUserRquest = ( user ) => ( {
  type: ADD_USER_REQUEST,
  payload: user
} );
export const getUserModal = () => ( {
  type: GET_USER_MODAL
} );

export const hideUserModal = () => ( {
  type: HIDE_USER_MODAL
} );

export const getUserDeleteModal = () => ( {
  type: GET_USER_DELETE_MODAL
} );

export const hideUserDeleteModal = () => ( {
  type: HIDE_USER_DELETE_MODAL
} );


// export const getCertficates = (employeeid ) => ( {
//   type: GET_CERTFICATE,
//   payload: employeeid
// } );

// export const getConfirmationCertficates = (employeeid ) => ( {
//   type: GET_CONFIRMATIO_LETTER,
//   payload: employeeid
// } );

// export const getInternShipLetter = (data ) => ( {
//   type: GET_INTERNSHIP_LETTER,
//   payload: data
// } );




export const getError = ( error ) => ( {
  type: GET_ERROR,
  payload: error
} );