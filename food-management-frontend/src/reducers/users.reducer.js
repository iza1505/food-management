import { ACTIONS } from "../actions/users.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  users: [],
  fetchingUsers: false,
  pageCount: 1,
  currentPage: 1
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
    case `${ACTIONS.CHANGE_ACCOUNT_STATUS}_${REJECTED}`:
      return {
        ...state,
        fetchingUsers: false
        //errors: action.payload.response.data
      };

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
