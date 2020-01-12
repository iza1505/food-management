import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
//import { mapRoles } from "../helpers";

const initialState = {
  logged: false,
  id: null,
  token: null,
  tokenExpDate: null,
  role: null,
  login: null,
  email: null,
  fetchingUser: false,
  version: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //case `${ACTIONS.REFRESH_TOKEN}_${PENDING}`:CHANGE_PASSWORD
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
    case `${ACTIONS.GET_DETAILS}_${PENDING}`:
    case `${ACTIONS.UPDATE_DETAILS}_${PENDING}`:
    case `${ACTIONS.CHANGE_PASSWORD}_${PENDING}`:
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
        token: action.payload.data.accessToken,
        tokenExpDate: token.exp,
        role: role
      };
    }

    case `${ACTIONS.GET_DETAILS}_${FULFILLED}`: {
      return {
        ...state,
        fetchingUser: false,
        id: action.payload.data.id,
        email: action.payload.data.email,
        version: action.payload.data.version
      };
    }

    case `${ACTIONS.UPDATE_DETAILS}_${FULFILLED}`: {
      return {
        ...state,
        email: action.payload.data.email,
        version: action.payload.data.version
      };
    }

    //case `${ACTIONS.REFRESH_TOKEN}_${REJECTED}`:
    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
    case ACTIONS.LOGOUT_USER: {
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
