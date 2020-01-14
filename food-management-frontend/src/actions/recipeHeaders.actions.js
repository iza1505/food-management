import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_HEADERS_RECIPE: "RECIPEHEADERS_GET_HEADERS_RECIPE"
};

const getHeaders = url => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_HEADERS_RECIPE, {
      url: url,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

export { getHeaders };
