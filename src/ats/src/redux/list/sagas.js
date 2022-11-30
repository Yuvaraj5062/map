import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_LIST_LIST_REQUEST,
    GET_OFFER_LIST_REQUEST,
    GET_VTBJ_LIST_REQUEST,
    GET_JOIN_LIST_REQUEST,
    GET_BD_LIST_REQUEST
} from './constants'


function* getListList () {
    try {
        const response = yield  call( api.getListList );
       if (response.data && response.data.Data) {
        yield put( actions.setList( response.data.Data ) );
       }
       else{
        yield put( actions.setList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetListRequest(){
    yield takeEvery( GET_LIST_LIST_REQUEST, getListList );
}
//offer
function* getOfferList () {
    try {
        const response = yield  call( api.getOfferList );
       if (response.data && response.data.Data) {
        yield put( actions.setOfferList( response.data.Data ) );
       }
       else{
        yield put( actions.setOfferList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetOfferRequest(){
    yield takeEvery( GET_OFFER_LIST_REQUEST, getOfferList );
}
//view to be join
function* getViewToBeJoinList (action) {
    try {
        const response = yield  call( api.getViewToBeJoinList, action.username );
       if (response.data && response.data.Data) {
        yield put( actions.setViewToBeJoinList( response.data.Data ) );
       }
       else{
        yield put( actions.setViewToBeJoinList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetViewToBeJoinRequest(){
    yield takeEvery( GET_VTBJ_LIST_REQUEST, getViewToBeJoinList );
}

//Join List
function* getJoinList () {
    try {
        const response = yield  call( api.getJoinList );
       if (response.data && response.data.Data) {
        yield put( actions.setJoinList( response.data.Data ) );
        ////console.log(response.data)
       }
       else{
        yield put( actions.setJoinList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetJoinRequest(){
    yield takeEvery( GET_JOIN_LIST_REQUEST, getJoinList );
}

//BD List
function* getBDList () {
    try {
        const response = yield  call( api.getBDList );
       if (response.data && response.data.Data) {
        yield put( actions.setBDList( response.data.Data ) );
        ////console.log(response.data)
       }
       else{
        yield put( actions.setBDList( [] ) );
       }
    } catch (error) {
        //console.log(error);
    }
}
function* watchGetBDRequest(){
    yield takeEvery( GET_BD_LIST_REQUEST, getBDList );
}

function* listSagas() {
    yield all([
        fork( watchGetListRequest ),
        fork( watchGetOfferRequest ),
        fork( watchGetViewToBeJoinRequest ),
        fork( watchGetJoinRequest ),
        fork( watchGetBDRequest ),
    ]);
}

export default listSagas;
