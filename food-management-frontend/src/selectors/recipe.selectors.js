import get from "lodash/get";

const getRecipe = state => get(state, "recipe.recipe");
const getFethingRecipe = state => get(state, "recipe.fetchingRecipe");
const getError = state => get(state, "recipe.error");


export { getRecipe, getFethingRecipe, getError };
