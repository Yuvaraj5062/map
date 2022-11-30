import {CREATE_PASS_SUCCESS, } from './constants'

const INIT_STATE = {
    createpass:{},
    loading:false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
       
            case  CREATE_PASS_SUCCESS:
                return{
                    ...state,
                    createpass: action.payload,
                    loading:false
                };
            
        default:
            return state;
    }
};