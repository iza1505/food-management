import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_RECIPE: "RECIPE_GET_HEADERS_RECIPE",
  UPDATE_RECIPE: "RECIPE_RESET_HEADERS",
  DELETE_RECIPE: "RECIPE_DELETE_RECIPE",
  ADD_RECIPE: "RECIPE_ADD_RECIPE",
  UPDATE_RECIPE_STATUS: "RECIPE_UPDATE_RECIPE_STATUS"
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
    APIService.post(ACTIONS.ADD_RECIPE, {
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

const deleteRecipe = recipeId => dispatch => {
  return dispatch(
    APIService.delete(ACTIONS.DELETE_RECIPE, {
      url: `/recipes/${recipeId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const updateRecipeStatus = (
  id,
  version,
  active,
  waitingForAccept,
  toImprove
) => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.UPDATE_RECIPE_STATUS, {
      url: `/recipes/${id}/updateStatus`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        version: version,
        active: active,
        waitingForAccept: waitingForAccept,
        toImprove: toImprove
      }
    })
  );
};

export {
  getRecipeDetails,
  deleteRecipe,
  updateRecipe,
  addRecipe,
  updateRecipeStatus
};
