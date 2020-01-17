import { ACTIONS } from "../actions/ingredients.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  ingredients: [],
  sortedIngredients: [],
  fetchingIngredients: false
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${PENDING}`:
      return { ...state, fetchingIngredients: true };

    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${FULFILLED}`: {
      console.log("zapisuej");
      return {
        ...state,
        fetchingIngredients: false,
        sortedIngredients: action.payload.data
      };
    }

    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${REJECTED}`:
      return {
        ...state,
        fetchingIngredients: false
        //errors: action.payload.response.data
      };

    default:
      return state;
  }
};

export default ingredientsReducer;
