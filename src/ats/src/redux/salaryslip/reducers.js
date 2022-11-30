import {GET_SALARY_SLIP_REQUEST, SET_SALARY_SLIP_REQUEST} from './constants'

const INIT_STATE = {
    salarySlips: [],
    salarySlip:{},
    payload:{},
    loading:false,
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case  SET_SALARY_SLIP_REQUEST:
            return{
                ...state,
                salarySlips: action.payload,
                loading:false
            };
        default:
            return state;
    }
};