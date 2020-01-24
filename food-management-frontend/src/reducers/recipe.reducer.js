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
    case `${ACTIONS.DELETE_RECIPE}_${PENDING}`:
    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${PENDING}`:
      return { ...state, fetchingRecipe: true, editable: false };

    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${FULFILLED}`:
    case `${ACTIONS.GET_RECIPE}_${FULFILLED}`: {
      console.log(action.payload.data);
      return {
        ...state,
        recipe: action.payload.data,
        fetchingRecipe: false,
        editable: true
      };
    }

    case `${ACTIONS.GET_RECIPE}_${REJECTED}`:
      return {
        fetchingRecipe: false,
        initialState
        //errors: action.payload.response.data
      };

    case `${ACTIONS.UPDATE_RECIPE_STATUS}_${REJECTED}`:
    case `${ACTIONS.ADD_RECIPE}_${REJECTED}`: {
      //console.log("rejected: " + JSON.stringify(action.payload.response.data));
      return state;
    }

    default:
      return state;
  }
};

export default recipeReducer;
