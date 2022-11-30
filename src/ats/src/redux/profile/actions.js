import {GET_PROFILE_LIST_REQUEST, 
   SET_PROFILE_LIST_REQUEST,SET_PROFILE_IMAGE_REQUEST,GET_PROFILE_IMAGE_REQUEST} from './constants';


export const getProfileList =(id)=>({
  type:GET_PROFILE_LIST_REQUEST,
  id:id
})

export const setProfile = ( profile ) => ( {
  type: SET_PROFILE_LIST_REQUEST,
  payload: profile
} );

//new
export const setProfileImage = ( image ) => ( {

  type: SET_PROFILE_IMAGE_REQUEST,
  payload: image
} );


