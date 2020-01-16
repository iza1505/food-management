import { ACTIONS } from "../actions/recipeHeaders.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  recipesHeaders: [],
  pageCount: 1,
  fetchingHeaders: false,
  currentPage: 1
};

const recipeHeadersReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_HEADERS_RECIPE}_${PENDING}`:
      return { ...state, fetchingHeaders: true };

    case `${ACTIONS.GET_HEADERS_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        fetchingHeaders: false,
        recipesHeaders: action.payload.data.headers,
        pageCount: action.payload.data.pageCount,
        currentPage: action.payload.data.currentPage
      };
    }

    case ACTIONS.RESET_HEADERS: {
      return initialState;
    }

    case ACTIONS.RESET_CURRENTPAGE_ON_SUBMIT: {
      return {
        ...state,
        currentPage: 1
      };
    }

    case `${ACTIONS.GET_HEADERS_RECIPE}_${REJECTED}`:
      return {
        ...state,
        fetching: false
        //errors: action.payload.response.data
      };

    default:
      return state;
  }
};

export default recipeHeadersReducer;
