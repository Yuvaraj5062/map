import {
    GET_LIST_LIST_REQUEST,
    SET_LIST_LIST_REQUEST,
    GET_OFFER_LIST_REQUEST,
    SET_OFFER_LIST_REQUEST,
    GET_VTBJ_LIST_REQUEST,
    SET_VTBJ_LIST_REQUEST,
    GET_JOIN_LIST_REQUEST,
    SET_JOIN_LIST_REQUEST,
    GET_BD_LIST_REQUEST,
    SET_BD_LIST_REQUEST
} from './constants';

export const getListList = () => ({
    type: GET_LIST_LIST_REQUEST,
});

export const setList = (list) => ({
    type: SET_LIST_LIST_REQUEST,    
    payload: list,
    
});
//offer
export const getOfferList = () => ({
    type: GET_OFFER_LIST_REQUEST,
});

export const setOfferList = (offer) => ({
    type: SET_OFFER_LIST_REQUEST,
    payload: offer,
});
//View to be join
export const getViewToBeJoinList = (username) => ({
    type: GET_VTBJ_LIST_REQUEST,
    username:username
});

export const setViewToBeJoinList = (viewtobejoin) => ({
    type: SET_VTBJ_LIST_REQUEST,
    payload: viewtobejoin,
});

//Join List
export const getJoinList = () => ({
  type: GET_JOIN_LIST_REQUEST,
});
export const setJoinList = (joinlist) => ({
  type: SET_JOIN_LIST_REQUEST,
  payload: joinlist,
});

//BD List
export const getBDList = () => ({
  type: GET_BD_LIST_REQUEST,
});
export const setBDList = (bdlist) => ({
  type: SET_BD_LIST_REQUEST,
  payload: bdlist,
});
