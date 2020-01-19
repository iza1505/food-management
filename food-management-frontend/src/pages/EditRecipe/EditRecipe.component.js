import React from "react";
import { reduxForm, Form, Field, FieldArray } from "redux-form";
import { bool, func, object, array } from "prop-types";

import {
  validateRequired,
  validateIngredientExists,
  validateSelectedOption,
  validateInteger
} from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import mySelect from "../../components/Fields/MySelect";
import textarea from "../../components/Fields/textarea";

export const EditRecipe = props => {
  const { handleSubmit, ingredientsOptions, editable } = props;

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
            validate={[validateRequired, validateInteger]}
            component={input}
          />

          <label>Ingredients:</label>
          <FieldArray
            name="recipe.ingredients"
            component={renderIngredients}
            options={ingredientsOptions}
          />
          <Field
            className="form-control mb-2 mr-sm-2 textarea-autosize"
            name="recipe.description"
            type="text"
            placeholder="Description"
            label="Description:"
            validate={validateRequired}
            component={textarea}
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
  <div>
    {fields.map((ingredient, index) => (
      <div className="d-flex flex-row bd-highlight mb-3" key={index}>
        <Field
          name={`${ingredient}.ingredient`}
          type="text"
          component={mySelect}
          options={options}
          label={"Ingredient #" + Number(index + 1)}
          defaultValue={ingredient.amount}
          className=" bd-highlight form-control mb-2 mr-sm-2"
          validate={[validateSelectedOption, validateIngredientExists]}
        />
        <Field
          className="form-control p-2 bd-highlight"
          name={`${ingredient}.amount`}
          type="number"
          component={input}
          label="Amount"
          validate={[validateRequired, validateInteger]}
        />
        <button
          type="button"
          className="btn btn-warning p-1 m-2 bd-highlight align-self-center"
          title="Remove ingredient"
          onClick={() => fields.remove(index)}
        >
          Remove ingredient
        </button>
      </div>
    ))}
    <div>
      <button
        className="btn btn-warning"
        type="button"
        onClick={() => fields.push({})}
      >
        Add new ingredient
      </button>
      {submitFailed && error && <span>{error}</span>}
    </div>
  </div>
);

EditRecipe.propTypes = {
  editable: bool,
  handleSubmit: func,
  ingredientsOptions: array
};

export default reduxForm({
  form: "editRecipeForm",
  enableReinitialize: true
})(EditRecipe);
