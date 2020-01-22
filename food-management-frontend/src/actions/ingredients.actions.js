import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_SORTED_INGREDIENTS: "INGREDIENTS_GET_SORTED_INGREDIENTS",
  GET_INGREDIENTS_USER: "INGREDIENTS_GET_INGREDIENTS_USER",
  DELETE_INGREDIENT_USER: "INGREDIENTS_DELETE_INGREDIENT_USER",
  UPDATE_INGREDIENT_USER: "INGREDIENTS_UPDATE_INGREDIENT_USER",
  ADD_INGREDIENT_TO_FRIDGE: "INGREDIENTS_ADD_INGREDIENT_TO_FRIDGE",
  GET_MEASURES: "INGREDIENTS_GET_MEASURES"
};

const getSortedIngredients = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_SORTED_INGREDIENTS, {
      url: `/ingredients/all`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const getIngredientsUser = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_INGREDIENTS_USER, {
      url: `/myIngredients`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const deleteIngredientsUser = ingredientId => dispatch => {
  return dispatch(
    APIService.delete(ACTIONS.DELETE_INGREDIENT_USER, {
      url: `/myIngredients/${ingredientId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const updateIngredientUser = ingredient => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.UPDATE_INGREDIENT_USER, {
      url: `/myIngredients`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        version: ingredient.version
      }
    })
  );
};

const addIngredientToFridge = (ingredient, amount) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_INGREDIENT_TO_FRIDGE, {
      url: `/myIngredients`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        ingredient: ingredient,
        amount: amount
      }
    })
  );
};

const getMeasures = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_MEASURES, {
      url: `/measures`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const addIngredientToDatabase = (ingredientName, measure) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_INGREDIENT_TO_FRIDGE, {
      url: `/ingredients`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        ingredientName: ingredientName,
        measure: measure
      }
    })
  );
};

export {
  getSortedIngredients,
  getIngredientsUser,
  deleteIngredientsUser,
  updateIngredientUser,
  addIngredientToFridge,
  getMeasures,
  addIngredientToDatabase
};
