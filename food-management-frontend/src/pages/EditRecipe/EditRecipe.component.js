import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { bool, func, object, array } from "prop-types";
import _ from "lodash";

import { validateRequired, validateInteger } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import select from "../../components/Fields/select";
import textarea from "../../components/Fields/textarea";

export const EditRecipe = props => {
  const {
    fetching,
    handleSubmit,
    ingredientsOptions,
    selectedIngredients,
    handleSelectIngredient,
    handleAmountIngredient,
    handleAddIngredientToList,
    handleDeteleIngredientFromListButton,
    selectedIngredient
  } = props;
  return (
    <LayoutMain title="Edytuj przepis">
      <div className="d-flex flex-column bd-highlight mb-3">
        <Form onSubmit={handleSubmit} autoComplete="on">
          <Field
            className="form-control p-2 bd-highlight"
            name="recipe.title"
            type="text"
            placeholder="Tytuł"
            label="Tytuł:"
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2"
            name="recipe.preparationMins"
            type="text"
            placeholder="Czas przygotowania (min)"
            label="Czas przygotowania (min):"
            validate={[validateRequired, validateInteger]}
            component={input}
          />
          <label>Składniki:</label>
          {selectedIngredients ? (
            selectedIngredients.map((elem, index) => (
              <div key={index}>
                {elem.ingredient.ingredientName}: {elem.amount}{" "}
                {elem.ingredient.measure.measureName}
                <button
                  type="button"
                  className="btn btn-warning p-1 m-2 bd-highlight align-self-center"
                  title="Add ingr to list"
                  onClick={() => handleDeteleIngredientFromListButton(index)}
                >
                  Usuń składnik
                </button>
              </div>
            ))
          ) : (
            <></>
          )}

          <div className="d-flex justify-content-end">
            <h5>Dodaj nowy składnik do przepisu:</h5>
            <Field
              className="form-control mr-auto p-2 bd-highlight"
              name="selectIngredient"
              type="text"
              label={
                _.isEmpty(selectedIngredient)
                  ? "Wybierz składnik: (brak wybranego)"
                  : "Wybierz składnik:"
              }
              component={select}
              options={ingredientsOptions}
              onBlur={e => handleSelectIngredient(e)}
            />
            <Field
              placeholder="Ilość"
              label="Ilość: "
              component={input}
              className="form-control p-2 bd-highlight"
              name="selectedIngredientAmount"
              type="number"
              onBlur={e => handleAmountIngredient(e)}
            />
            <button
              type="button"
              className="btn btn-warning p-2 flex-shrink-1 bd-highlight"
              title="Add ingr to list"
              onClick={() => handleAddIngredientToList()}
            >
              Dodaj składnik do listy
            </button>
          </div>

          <Field
            className="form-control mb-2 mr-sm-2 textarea-autosize"
            name="recipe.description"
            type="text"
            placeholder="Opis"
            label="Opis:"
            validate={validateRequired}
            component={textarea}
          />
          <div className="d-flex justify-content-center">
            <MyLoader visible={fetching} />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success "
              type="submit"
              disabled={fetching}
            >
              {" "}
              Aktualizuj{" "}
            </button>
          </div>
        </Form>
      </div>
    </LayoutMain>
  );
};

EditRecipe.propTypes = {
  fetching: bool,
  handleAddIngredientToList: func,
  handleAmountIngredient: func,
  handleDeteleIngredientFromListButton: func,
  handleSelectIngredient: func,
  handleSubmit: func,
  ingredientsOptions: array,
  selectedIngredient: object,
  selectedIngredients: array
};

export default reduxForm({
  form: "editRecipeForm",
  enableReinitialize: true
})(EditRecipe);
