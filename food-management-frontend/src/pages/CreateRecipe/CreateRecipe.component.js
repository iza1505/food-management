import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { bool, func, object, array } from "prop-types";
import _ from "lodash";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import { validateRequired, validateInteger } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import select from "../../components/Fields/select";
import textarea from "../../components/Fields/textarea";

export const CreateRecipe = props => {
  const {
    fetching,
    handleSubmit,
    ingredientsOptions,
    selectedIngredients,
    handleSelectIngredient,
    handleAmountIngredient,
    handleAddIngredientToList,
    handleDeteleIngredientFromListButton,
    selectedIngredient,
    t
  } = props;
  return (
    <LayoutMain title="Utwórz przepis">
      <div className="d-flex flex-column bd-highlight mb-3">
        <Form onSubmit={handleSubmit} autoComplete="on">
          <Field
            className="form-control p-2 bd-highlight"
            name="recipe.title"
            type="text"
            placeholder={t("placeholder.title")}
            label={t("label.title")}
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2"
            name="recipe.preparationMins"
            type="text"
            placeholder={t("placeholder.preparationTime")}
            label={t("label.preparationTime")}
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
            <h5 className="mr-2">{t("label.addNewIngredientToRecipe")}</h5>
            <Field
              className="form-control mr-auto p-2 bd-highlight"
              name="selectIngredient"
              type="text"
              firstNeedTranslate={true}
              label={t("label.selectIngredient")}
              component={select}
              options={ingredientsOptions}
              onBlur={e => handleSelectIngredient(e)}
            />
            <Field
              placeholder={t("placeholder.amount")}
              label={t("label.amount")}
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
            placeholder={t("placeholder.description")}
            label={t("label.description")}
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
              Utwórz{" "}
            </button>
          </div>
        </Form>
      </div>
    </LayoutMain>
  );
};

CreateRecipe.propTypes = {
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

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "createRecipeForm",
    enableReinitialize: true
  })
)(CreateRecipe);
