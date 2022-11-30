import {CREATE_ROLE, CREATE_ROLE_SUCCESS, GET_ROLE_LIST_REQUEST, 
   SET_ROLE_LIST_REQUEST,} from './constants';


export const getRoleList =()=>({
  type:GET_ROLE_LIST_REQUEST
})

export const getRolelistRequest = ( role ) => ( {
  type: SET_ROLE_LIST_REQUEST,
  payload: role
} );
export const createRole = ( createrole ) => ( {
  type: CREATE_ROLE,
  payload: createrole
} );
export const createRoleSuccess = ( createrole ) => ( {
  type: CREATE_ROLE_SUCCESS,
  payload: createrole
} );