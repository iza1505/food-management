import get from "lodash/get";

const getRecipesHeaders = state => get(state, "recipeHeaders.recipesHeaders");
const getPageCount = state => get(state, "recipeHeaders.pageCount");
const getFetchingHeaders = state => get(state, "recipeHeaders.fetchingHeaders");
const getFetchingRecipe = state => get(state, "recipeHeaders.fetchingRecipe");
const getCurrentPage = state => get(state, "recipeHeaders.currentPage");

export {
  getFetchingHeaders,
  getFetchingRecipe,
  getPageCount,
  getRecipe,
  getRecipesHeaders,
  getCurrentPage
};
