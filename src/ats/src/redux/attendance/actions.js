import {GET_ATTENDANCE_LIST_REQUEST, 
   SET_ATTENDANCE_LIST_REQUEST,} from './constants';


export const getAttendanceList =()=>({
  type:GET_ATTENDANCE_LIST_REQUEST,
})

export const setAttendance = ( attendance ) => ( {
  type: SET_ATTENDANCE_LIST_REQUEST,
  payload: attendance
} );