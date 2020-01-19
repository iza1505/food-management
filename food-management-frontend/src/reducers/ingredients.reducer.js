import { ACTIONS } from "../actions/ingredients.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  ingredients: [],
  sortedIngredients: [],
  fetchingIngredients: false,
  fetchingSortedIngredients: false
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${PENDING}`:
      return { ...state, fetchingSortedIngredients: true };
    case `${ACTIONS.GET_INGREDIENTS_USER}_${PENDING}`:
    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${PENDING}`: {
      return { ...state, fetchingIngredients: true };
    }

    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${FULFILLED}`: {
      return {
        ...state,
        fetchingIngredients: false,
        sortedIngredients: action.payload.data
      };
    }

    case `${ACTIONS.GET_INGREDIENTS_USER}_${FULFILLED}`: {
      return {
        ...state,
        fetchingSortedIngredients: false,
        ingredients: action.payload.data
      };
    }

    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${FULFILLED}`: {
      return {
        ...state,
        fetchingIngredients: false
        //ingredients: action.payload.data
      };
    }

    case `${ACTIONS.GET_INGREDIENTS_USER}_${REJECTED}`:
    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${REJECTED}`:
    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${REJECTED}`:
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
