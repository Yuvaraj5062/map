import {GET_DOCS_LIST_REQUEST, 
   SET_DOCS_LIST_REQUEST,} from './constants';


export const getDocsList =()=>({
  type:GET_DOCS_LIST_REQUEST,
})

export const setDocs = ( docs ) => ( {
  type: SET_DOCS_LIST_REQUEST,
  payload: docs
} );