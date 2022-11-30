import {GET_BIRTHDAY_LIST_REQUEST, 
   SET_BIRTHDAY_LIST_REQUEST,} from './constants';


export const getBirthdayList =()=>({
  type:GET_BIRTHDAY_LIST_REQUEST,
})

export const setBirthday = ( birthday ) => ( {
  type: SET_BIRTHDAY_LIST_REQUEST,
  payload: birthday
} );