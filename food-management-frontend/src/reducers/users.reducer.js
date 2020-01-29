import { ACTIONS } from "../actions/users.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  users: [],
  fetchingUsers: false,
  pageCount: 1,
  currentPage: 1,
  error: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_USERS}_${PENDING}`:
    case `${ACTIONS.CHANGE_ACCOUNT_STATUS}_${PENDING}`: {
      return { ...state, fetchingUsers: true };
    }

    case `${ACTIONS.GET_USERS}_${FULFILLED}`: {
      return {
        ...state,
        fetchingUsers: false,
        users: action.payload.data.headers,
        pageCount: action.payload.data.pageCount,
        currentPage: action.payload.data.currentPage
      };
    }

    case `${ACTIONS.CHANGE_ACCOUNT_STATUS}_${FULFILLED}`: {
      return { ...state, fetchingUsers: false };
    }

    case `${ACTIONS.GET_USERS}_${REJECTED}`:
    case `${ACTIONS.CHANGE_ACCOUNT_STATUS}_${REJECTED}`: {
      if (action.payload.response) {
        return {
          ...state,
          fetchingUsers: false,
          error: action.payload.response.data.message
        };
      } else {
        return {
          ...state,
          fetchingUsers: false,
          error: null
        };
      }
    }

    case ACTIONS.RESET_CURRENTPAGE_ON_SUBMIT: {
      return {
        ...state,
        currentPage: 1
      };
    }

    case ACTIONS.RESET_USERS: {
      return initialState;
    }

    default:
      return state;
  }
};

export default usersReducer;
