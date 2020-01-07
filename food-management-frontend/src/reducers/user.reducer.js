import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
//import { prepareToken, mapRoles } from "../helpers";

const initialState = {
  logged: false,
  id: null,
  token: null,
  tokenExpDate: null,
  role: null,
  login: null,
  fetchingUser: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //case `${ACTIONS.REFRESH_TOKEN}_${PENDING}`:
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
      return { ...state, fetchingUser: true };

    //case `${ACTIONS.REFRESH_TOKEN}_${FULFILLED}`:
    case `${ACTIONS.LOGIN_USER}_${FULFILLED}`: {
      const token = prepareToken(action.payload.data.accessToken);
      const role = token.roles[0]["authority"];
      return {
        ...state,
        fetchingUser: false,
        logged: true,
        login: token.sub,
        token: action.payload.data.token,
        tokenExpDate: token.exp,
        role: role
      };
    }

    
    //case `${ACTIONS.REFRESH_TOKEN}_${REJECTED}`:
    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
    case ACTIONS.LOGOUT_USER:{
      return initialState;
    }
      
      
    default:
      return state;
  }
};

const prepareToken = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  };

export default userReducer;
