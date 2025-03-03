import React from "react";
import { array, bool, func } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import input from "../../../components/Fields/input";
import MyLoader from "../../../components/Loader/loader.component";
import { validateRequired, validateInteger } from "../../Validators/Validators";

import select from "../../../components/Fields/select";

const AddIngredientToFridgeModalForm = props => {
  const {
    handleSubmit,
    avaliableIngredientsToAddToFridge,
    fetching,
    t
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addIngredientToFridgeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addIngredientToFridgeModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Dodaj produkt</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Dodaj produkt do lodówki</h1>
              <Field
                className="form-control "
                name="ingredient"
                id="ingredient"
                type="text"
                label={t("label.selectProduct")}
                firstNeedTranslate={true}
                validate={[validateRequired]}
                component={select}
                options={avaliableIngredientsToAddToFridge}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="amount"
                id="amount"
                type="number"
                placeholder={t("placeholder.amount")}
                label={t("label.amount")}
                validate={[validateInteger]}
                component={input}
              />

              <div className="modal-footer">
                <MyLoader visible={fetching} />
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={fetching}
                >
                  {t("button.add")}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  disabled={fetching}
                >
                  {t("button.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

AddIngredientToFridgeModalForm.propTypes = {
  avaliableIngredientsToAddToFridge: array,
  fetching: bool,
  handleSubmit: func
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "addIngredientToFridgeModalForm",
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch) =>
      dispatch(reset("addIngredientToFridgeModalForm"))
  })
)(AddIngredientToFridgeModalForm);
