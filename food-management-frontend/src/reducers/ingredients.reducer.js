import { ACTIONS } from "../actions/ingredients.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  ingredients: [],
  sortedIngredients: [],
  measures: [],
  fetchingIngredients: false,
  fetchingSortedIngredients: false,
  fetchingMeasures: false,
  pageCount: 1,
  currentPage: 1,
  error: null
};

const ingredientsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${PENDING}`:
      return { ...state, fetchingSortedIngredients: true };
    case `${ACTIONS.GET_INGREDIENTS_USER}_${PENDING}`:
    case `${ACTIONS.GET_INGREDIENTS_ADMIN}_${PENDING}`:
    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${PENDING}`:
    case `${ACTIONS.DELETE_INGREDIENT}_${PENDING}`:
    case `${ACTIONS.UPDATE_INGREDIENT}_${PENDING}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_FRIDGE}_${PENDING}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_DATABASE}_${PENDING}`: {
      console.log("pending");
      return { ...state, fetchingIngredients: true };
    }

    case `${ACTIONS.GET_MEASURES}_${PENDING}`: {
      return { ...state, fetchingMeasures: true };
    }

    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${FULFILLED}`: {
      return {
        ...state,
        fetchingSortedIngredients: false,
        sortedIngredients: action.payload.data
      };
    }

    case `${ACTIONS.GET_INGREDIENTS_ADMIN}_${FULFILLED}`: {
      return {
        ...state,
        fetchingIngredients: false,
        ingredients: action.payload.data.headers,
        pageCount: action.payload.data.pageCount,
        currentPage: action.payload.data.currentPage
      };
    }
    case `${ACTIONS.GET_INGREDIENTS_USER}_${FULFILLED}`: {
      return {
        ...state,
        fetchingIngredients: false,
        ingredients: action.payload.data
      };
    }

    case `${ACTIONS.DELETE_INGREDIENT}_${FULFILLED}`:
    case `${ACTIONS.UPDATE_INGREDIENT}_${FULFILLED}`:
    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${FULFILLED}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_FRIDGE}_${FULFILLED}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_DATABASE}_${FULFILLED}`: {
      console.log("fulllfil");
      return {
        ...state,
        fetchingIngredients: false
      };
    }

    case `${ACTIONS.GET_MEASURES}_${FULFILLED}`: {
      return {
        ...state,
        fetchingMeasures: false,
        measures: action.payload.data
      };
    }

    case `${ACTIONS.GET_INGREDIENTS_ADMIN}_${REJECTED}`:
    case `${ACTIONS.GET_INGREDIENTS_USER}_${REJECTED}`:
    case `${ACTIONS.GET_SORTED_INGREDIENTS}_${REJECTED}`:
    case `${ACTIONS.UPDATE_INGREDIENT_USER}_${REJECTED}`:
    case `${ACTIONS.DELETE_INGREDIENT}_${REJECTED}`:
    case `${ACTIONS.UPDATE_INGREDIENT}_${REJECTED}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_FRIDGE}_${REJECTED}`:
    case `${ACTIONS.ADD_INGREDIENT_TO_DATABASE}_${REJECTED}`:
      return {
        ...state,
        fetchingIngredients: false,
        error: action.payload.response.data.message
      };

    case `${ACTIONS.GET_MEASURES}_${REJECTED}`: {
      return {
        ...state,
        fetchingMeasures: false,
        error: action.payload.response.data.message
      };
    }

    case ACTIONS.RESET_CURRENTPAGE_ON_SUBMIT: {
      return {
        ...state,
        currentPage: 1
      };
    }

    case ACTIONS.RESET_INGREDIENTS: {
      return initialState;
    }

    default:
      return state;
  }
};

export default ingredientsReducer;
