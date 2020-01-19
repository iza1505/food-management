import get from "lodash/get";

const getRecipe = state => get(state, "recipe.recipe");
const getFethingRecipe = state => get(state, "recipe.fetchingRecipe");
const getEditableRecipe = state => get(state, "recipe.editable");

export { getRecipe, getFethingRecipe, getEditableRecipe };
