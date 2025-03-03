import get from "lodash/get";

const getSortedIngredients = state =>
  get(state, "ingredients.sortedIngredients");
const getIngredients = state => get(state, "ingredients.ingredients");
const getFethingIngredients = state =>
  get(state, "ingredients.fetchingIngredients");
const getFetchingSortedIngredients = state =>
  get(state, "ingredients.fetchingSortedIngredients");
const getMeasures = state => get(state, "ingredients.measures");
const getPageCount = state => get(state, "ingredients.pageCount");
const getCurrentPage = state => get(state, "ingredients.currentPage");
const getError = state => get(state, "ingredients.error");


export {
  getSortedIngredients,
  getIngredients,
  getFethingIngredients,
  getFetchingSortedIngredients,
  getMeasures,
  getPageCount,
  getCurrentPage,
  getError
};
