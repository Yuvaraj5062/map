
import {GET_SALARY_SLIP_REQUEST, SET_SALARY_SLIP_REQUEST } from './constants';


export const getSalarySlipList =(data)=>({
  type:GET_SALARY_SLIP_REQUEST,
  payload: data
})

export const setSalarySlips = ( salarySlips ) => ( {
  type: SET_SALARY_SLIP_REQUEST,
  payload: salarySlips
});