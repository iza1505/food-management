import { ACTIONS } from "../actions/recipeHeaders.actions";
import { ACTIONS as ACTIONS_Recipe } from "../actions/recipe.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  recipesHeaders: [],
  pageCount: 1,
  fetchingHeaders: false,
  currentPage: 1,
  error: null
};

const recipeHeadersReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_HEADERS_RECIPE}_${PENDING}`:
    case `${ACTIONS_Recipe.DELETE_RECIPE}_${PENDING}`:
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

    case `${ACTIONS_Recipe.DELETE_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        fetchingHeaders: false
      };
    }

    case `${ACTIONS.GET_HEADERS_RECIPE}_${REJECTED}`:
    case `${ACTIONS_Recipe.DELETE_RECIPE}_${REJECTED}`: {
      if (action.payload.response) {
        return {
          ...state,
          fetchingHeaders: false,
          error: action.payload.response.data.message
        };
      } else {
        return {
          ...state,
          fetchingHeaders: false,
          error: null
        };
      }
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

    default:
      return state;
  }
};

export default recipeHeadersReducer;
