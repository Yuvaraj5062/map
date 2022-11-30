import {CREATE_CLIENT, CREATE_CLIENT_SUCCESS, GET_CLIENT_LIST_REQUEST, 
   SET_CLIENT_LIST_REQUEST,ADD_CLIENT,GET_CLIENT_MODAL,HIDE_CLIENT_MODAL, UPDATE_CLIENT, DELETE_CLIENT} from './constants';


export const getClientList =()=>({
  type:GET_CLIENT_LIST_REQUEST
})

export const setClientList = ( clients ) => ( {
  type: SET_CLIENT_LIST_REQUEST,
  payload: clients
} );

export const createClient = ( clients ) => ( {
  type: CREATE_CLIENT,
  payload: clients
} );
export const createClientSuccess = ( createclients ) => ( {
  type: CREATE_CLIENT_SUCCESS,
  payload: createclients
} );

export const updateClient =  (Client) => ({
  type: UPDATE_CLIENT,
  payload: Client
})

export const deleteClient =  (clientId) => ({
  type: DELETE_CLIENT,
  id: clientId
})

export const setClient = ( client ) => ( {
  type: ADD_CLIENT,
  payload: client
} );
export const getClientModal = () => ( {
  type: GET_CLIENT_MODAL
} );

export const hideClientModal = () => ( {
  type: HIDE_CLIENT_MODAL
} );