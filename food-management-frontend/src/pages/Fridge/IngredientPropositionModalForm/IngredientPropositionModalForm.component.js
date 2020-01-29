import React from "react";
import { array, bool, func, string } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import MyLoader from "../../../components/Loader/loader.component";
import { userRoles } from "../../../configuration/roles";
import { validateRequired } from "../../Validators/Validators";

const IngredientPropositionModalForm = props => {
  const { handleSubmit, userRole, measures, fetching, t } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="ingredientPropositionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ingredientPropositionModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Nowy produkt</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                {userRole && userRole === userRoles.user ? (
                  <>Zasugeruj nowy produkt.</>
                ) : (
                  <>Dodaj nowy produkt.</>
                )}
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="ingredientName"
                id="ingredientName"
                type="text"
                placeholder={t("placeholder.productName")}
                label={t("label.productName")}
                validate={validateRequired}
                component={input}
              />
              <Field
                className="form-control "
                name="measure"
                id="measure"
                type="text"
                firstNeedTranslate={true}
                label={t("label.selectMeasure")}
                validate={validateRequired}
                component={select}
                options={measures}
              />

              <div className="modal-footer">
                <MyLoader visible={fetching} />
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={fetching}
                >
                  Dodaj
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  disabled={fetching}
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

IngredientPropositionModalForm.propTypes = {
  fetching: bool,
  handleSubmit: func,
  measures: array,
  userRole: string
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "ingredientPropositionModalForm",
    enableReinitialize: true
  })
)(IngredientPropositionModalForm);
