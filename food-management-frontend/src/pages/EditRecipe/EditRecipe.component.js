import React from "react";
import { reduxForm, Form, Field, FieldArray } from "redux-form";
import { bool, func, object, array } from "prop-types";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import select from "../../components/Fields/select";
import mySelect from "../../components/Fields/MySelect";
import textarea from "../../components/Fields/textarea";

import AddIngredientModalForm from "./AddIngredientModalForm/AddIngredientModalForm.component";

export const EditRecipe = props => {
  const {
    handleDeleteIngredient,
    handleSubmit,
    handleAddIngredient,
    handleEditAmountIngredient,
    ingredientsOptions,
    editable,
    recipe,
    recipeIngredientsCopy
  } = props;

  return (
    <LayoutMain title="Edit recipe">
      <div className="d-flex flex-column bd-highlight mb-3">
        <Form onSubmit={handleSubmit} autoComplete="on">
          <Field
            className="form-control p-2 bd-highlight"
            name="recipe.title"
            type="text"
            placeholder="Title"
            label="Title:"
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2"
            name="recipe.preparationMins"
            type="text"
            placeholder="Preparation in mins"
            label="Preparation (mins):"
            validate={validateRequired}
            component={input}
          />

          <label>Ingredients:</label>
          {/* {recipeIngredientsCopy ? (
            recipeIngredientsCopy.map((ingredient, index) => (
              <div key={index}>
                {ingredient.ingredient.ingredientName} {ingredient.amount}{" "}
                {ingredient.ingredient.measure.measureName}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleDeleteIngredient(index);
                  }}
                >
                  -
                </button>
              </div>
            ))
          ) : (
            <></>
          )}

          {ingredientsOptions ? (
            <>
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#addIngredientModal"
                text="Registration"
                type="button"
              >
                Add/edit ingredient
              </button>
              <AddIngredientModalForm
                handleAddIngredient={() => handleAddIngredient()}
                ingredientsOptions={ingredientsOptions}
              />
            </>
          ) : (
            <></>
          )} */}
          {/* <AddIngredientModalForm
            handleAddIngredient={() => handleAddIngredient()}
            ingredientsOptions={ingredientsOptions}
          /> */}

          <Field
            className="form-control mb-2 mr-sm-2 textarea-autosize"
            name="recipe.description"
            type="text"
            placeholder="Description"
            label="Description:"
            validate={validateRequired}
            component={textarea}
          />
          <FieldArray
            name="recipe.ingredients"
            component={renderIngredients}
            //fields={recipe.ingredients}
            options={ingredientsOptions}
          />
          <button
            className="btn btn-success"
            type="submit"
            disabled={!editable}
          >
            {" "}
            Update{" "}
          </button>
        </Form>
      </div>
    </LayoutMain>
  );
};

const renderIngredients = ({
  fields,
  meta: { error, submitFailed },
  options
}) => (
  <ul>
    <li>
      <button
        className="btn btn-warning"
        type="button"
        onClick={() => fields.push({})}
      >
        Add ingredient
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((ingredient, index) => (
      <li key={index}>
        <Field
          name={`${ingredient}.ingredient`}
          type="text"
          component={mySelect}
          options={options}
          label="Ingredient"
          defaultValue={ingredient.amount}
        />
        <Field
          className="form-control p-2 bd-highlight"
          name={`${ingredient}.amount`}
          type="text"
          component={input}
          label="Amount"
        />
        <button
          type="button"
          className="btn btn-dangerous"
          title="Remove ingredient"
          onClick={() => fields.remove(index)}
        >
          -
        </button>
      </li>
    ))}
  </ul>
);

EditRecipe.propTypes = {
  editable: bool,
  handleDeleteIngredient: func,
  handleEditAmountIngredient: func,
  handleSubmit: func,
  ingredientsOptions: array,
  recipe: object,
  recipeIngredientsCopy: array
};

export default reduxForm({
  form: "editRecipeForm",
  enableReinitialize: true
})(EditRecipe);
