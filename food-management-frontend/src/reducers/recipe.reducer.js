import { ACTIONS } from "../actions/recipe.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  recipe: {},
  fetchingRecipe: false,
  editable: false
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_RECIPE}_${PENDING}`:
      return { ...state, fetchingHeaders: true, editable: false };

    case `${ACTIONS.GET_RECIPE}_${FULFILLED}`: {
      return {
        ...state,
        recipe: action.payload.data,
        editable: true
      };
    }

    case `${ACTIONS.GET_RECIPE}_${REJECTED}`:
      return {
        initialState
        //errors: action.payload.response.data
      };

    default:
      return state;
  }
};

export default recipeReducer;
