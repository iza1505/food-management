import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_RECIPE: "RECIPE_GET_HEADERS_RECIPE",
  UPDATE_RECIPE: "RECIPE_RESET_HEADERS",
  DELETE_RECIPE: "RECIPE_DELETE_RECIPE"
};

const getRecipeDetails = recipeId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_RECIPE, {
      url: `/recipes/${recipeId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const deleteRecipe = recipeId => dispatch => {
  return dispatch(
    APIService.delete(ACTIONS.DELETE_RECIPE, {
      url: `/recipes?id=${recipeId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const updateRecipe = (
  id,
  version,
  title,
  preparationMins,
  description,
  ingredients
) => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.UPDATE_RECIPE, {
      url: `/recipes/${id}`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        id: id,
        version: version,
        title: title,
        preparationMins: preparationMins,
        description: description,
        ingredients: [...ingredients]
      }
    })
  );
};

const addRecipe = (
  title,
  preparationMins,
  description,
  ingredients
) => dispatch =>
  dispatch(
    APIService.post(ACTIONS.LOGIN_USER, {
      url: "/recipes",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        title: title,
        preparationMins: preparationMins,
        description: description,
        ingredients: [...ingredients]
      }
    })
  );

export { getRecipeDetails, deleteRecipe, updateRecipe, addRecipe };
