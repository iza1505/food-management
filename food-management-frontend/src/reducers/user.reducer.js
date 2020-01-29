import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

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
    //case `${ACTIONS.REFRESH_TOKEN}_${PENDING}`:
    case `${ACTIONS.REGISTER_USER}_${PENDING}`:
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
    case `${ACTIONS.GET_DETAILS}_${PENDING}`:
    case `${ACTIONS.UPDATE_DETAILS}_${PENDING}`:
    case `${ACTIONS.CHANGE_PASSWORD}_${PENDING}`:
    case `${ACTIONS.SEND_RESET_PASSWORD_EMAIL}_${PENDING}`:
    case `${ACTIONS.RESET_PASSWORD}_${PENDING}`:
    case `${ACTIONS.SEND_CONFIRMATION_EMAIL}_${PENDING}`:
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
        role: role,
        error: null
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

    case `${ACTIONS.SEND_RESET_PASSWORD_EMAIL}_${FULFILLED}`:
    case `${ACTIONS.RESET_PASSWORD}_${FULFILLED}`:
    case `${ACTIONS.CHANGE_PASSWORD}_${FULFILLED}`:
    case `${ACTIONS.SEND_CONFIRMATION_EMAIL}_${FULFILLED}`:
    case `${ACTIONS.REGISTER_USER}_${FULFILLED}`: {
      return {
        ...state,
        fetchingUser: false
      };
    }

    //case `${ACTIONS.REFRESH_TOKEN}_${REJECTED}`:

    case `${ACTIONS.SEND_RESET_PASSWORD_EMAIL}_${REJECTED}`:
    case `${ACTIONS.RESET_PASSWORD}_${REJECTED}`:
    case `${ACTIONS.SEND_CONFIRMATION_EMAIL}_${REJECTED}`:
    case `${ACTIONS.REGISTER_USER}_${REJECTED}`:
    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
    case `${ACTIONS.CONFIRMATION_EMAIL}_${REJECTED}`:
    case `${ACTIONS.CHANGE_PASSWORD}_${REJECTED}`: {
      if (action.payload.response) {
        return {
          ...state,
          fetchingUser: false,
          error: action.payload.response.data.message
        };
      } else {
        return {
          ...state,
          fetchingUser: false,
          error: null
        };
      }
    }
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
