import {GET_LEAVE_LIST_REQUEST, 
   SET_LEAVE_LIST_REQUEST,GET_LEAVE_BALANCE_LIST_REQUEST, 
   SET_LEAVE_BALANCE_LIST_REQUEST,} from './constants';
   

export const getLeaveList =(username)=>({
  type:GET_LEAVE_LIST_REQUEST,
  username:username
})

export const setLeave = ( leave ) => ( {
  type: SET_LEAVE_LIST_REQUEST,
  payload: leave
} );
export const getLeaveBalanceList =(username)=>({
  type:GET_LEAVE_BALANCE_LIST_REQUEST,
  username:username
})

export const setLeaveBalance = ( leavebalance ) => ( {
  type: SET_LEAVE_BALANCE_LIST_REQUEST,
  payload: leavebalance
} );