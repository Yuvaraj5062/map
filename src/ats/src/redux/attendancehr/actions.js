import {GET_ATTENDANCE_LIST_REQUEST, 
   SET_ATTENDANCE_LIST_REQUEST,} from './constants';


export const getAttendanceList =(username,month, year)=>({
  type:GET_ATTENDANCE_LIST_REQUEST,
  username:username,
  month:month,
  year:year
})

export const setAttendance = ( attendance ) => ( {
  type: SET_ATTENDANCE_LIST_REQUEST,
  payload: attendance
} );