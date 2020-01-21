import get from "lodash/get";

const getSortedIngredients = state =>
  get(state, "ingredients.sortedIngredients");
const getIngredients = state => get(state, "ingredients.ingredients");
const getFethingIngredients = state =>
  get(state, "ingredients.fetchingIngredients");
const getFetchingSortedIngredients = state =>
  get(state, "ingredients.fetchingSortedIngredients");

export {
  getSortedIngredients,
  getIngredients,
  getFethingIngredients,
  getFetchingSortedIngredients
};
