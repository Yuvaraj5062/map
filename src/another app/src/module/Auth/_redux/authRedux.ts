import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeLatest } from "redux-saga/effects";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
};

export const reducer = persistReducer(
  { storage, key: "GOAPP-user", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action:any) => {
    switch (action.type) {
    
      case actionTypes.Login: {
        const { authToken } = action.payload;
        return { authToken: authToken.authKey, user: authToken.user };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { state, user };
      }

      default:
      
        return state;
    }
  }
);

export const actions = {
  login: (authToken:any) => ({ type: actionTypes.Login, payload: { authToken } }),
  
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user:any) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user:any) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  
};

export function* saga() {

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  
  });

}
