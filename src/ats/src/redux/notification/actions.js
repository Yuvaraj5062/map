import {GET_NOTIFY_LIST_REQUEST, 
   SET_NOTIFY_LIST_REQUEST,GET_NEW_NOTIFY_LIST_REQUEST, 
   SET_NEW_NOTIFY_LIST_REQUEST,} from './constants';


export const getNotificationList =(username)=>({
  type:GET_NOTIFY_LIST_REQUEST,
  username:username
})

export const setNotification = ( notification ) => ( {
  type: SET_NOTIFY_LIST_REQUEST,
  payload: notification
} );
export const getNewNotificationList =(username)=>({
  type:GET_NEW_NOTIFY_LIST_REQUEST,
  username:username
})

export const setNewNotification = ( newnotification ) => ( {
  type: SET_NEW_NOTIFY_LIST_REQUEST,
  payload: newnotification
} );