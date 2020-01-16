import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_HEADERS_RECIPE: "RECIPEHEADERS_GET_HEADERS_RECIPE",
  RESET_HEADERS: "RECIPEHEADERS_RESET_HEADERS",
  RESET_CURRENTPAGE_ON_SUBMIT: "RECIPEHEADERS_RESET_CURRENTPAGE_ON_SUBMIT"
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

const resetHeaders = () => dispatch => {
  dispatch({
    type: ACTIONS.RESET_HEADERS
  });
};

const resetCurrentPageOnSubmit = () => dispatch => {
  dispatch({
    type: ACTIONS.RESET_CURRENTPAGE_ON_SUBMIT
  });
};

export { getHeaders, resetHeaders, resetCurrentPageOnSubmit };
