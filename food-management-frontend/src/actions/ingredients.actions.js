import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_SORTED_INGREDIENTS: "INGREDIENTS_GET_SORTED_INGREDIENTS",
  GET_INGREDIENTS: "INGREDIENTS_GET_INGREDIENTS"
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

export { getSortedIngredients };
