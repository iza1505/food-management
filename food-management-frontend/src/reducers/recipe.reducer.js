import { ACTIONS } from "../actions/recipe.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  recipe: {},
  fetchingRecipe: false
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_RECIPE}_${PENDING}`:
    case `${ACTIONS.ADD_RECIPE}_${PENDING}`:
    case `${ACTIONS.DELETE_RECIPE}_${PENDING}`:
    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${PENDING}`:
    case `${ACTIONS.UPDATE_RECIPE}_${PENDING}`: {
      return { ...state, fetchingRecipe: true };
    }

    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${FULFILLED}`:
    case `${ACTIONS.GET_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        recipe: action.payload.data,
        fetchingRecipe: false
      };
    }

    case `${ACTIONS.UPDATE_RECIPE}_${FULFILLED}`:
    case `${ACTIONS.ADD_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        fetchingRecipe: false
      };
    }

    case `${ACTIONS.GET_RECIPE}_${REJECTED}`:
      return {
        fetchingRecipe: false,
        initialState
        //errors: action.payload.response.data
      };

    case `${ACTIONS.UPDATE_RECIPE}_${REJECTED}`:
    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${REJECTED}`:
    case `${ACTIONS.ADD_RECIPE}_${REJECTED}`: {
      return { ...state, fetchingRecipe: false };
    }

    default:
      return state;
  }
};

export default recipeReducer;
