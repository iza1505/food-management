import { ACTIONS } from "../actions/recipe.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  recipe: [],
  fetchingRecipe: false
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_RECIPE}_${PENDING}`:
      return { ...state, fetchingHeaders: true };

    case `${ACTIONS.GET_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        recipe: action.payload.data
      };
    }

    case `${ACTIONS.GET_RECIPE}_${REJECTED}`:
      return {
        ...state,
        fetching: false
        //errors: action.payload.response.data
      };

    default:
      return state;
  }
};

export default recipeReducer;
