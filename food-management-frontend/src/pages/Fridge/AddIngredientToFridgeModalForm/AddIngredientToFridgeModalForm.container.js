import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

import AddIngredientToFridgeModalForm from "./AddIngredientToFridgeModalForm.component";
import { addIngredientToFridge } from "../../../actions/ingredients.actions";
import {
  getFethingIngredients,
  getError
} from "../../../selectors/ingredients.selectors";

export class AddIngredientToFridgeModalFormContainer extends Component {
  static propTypes = {
    addIngredientToFridge: func,
    avaliableIngredientsToAddToFridge: array,
    error: string,
    fetching: bool,
    getIngredientsUser: func,
    t: func
  };

  handleSubmit = values => {
    return this.props
      .addIngredientToFridge(JSON.parse(values.ingredient), values.amount)
      .then(() => {
        toast.info(this.props.t("toastInfo.productHasBeenAdded"));
        this.props.getIngredientsUser();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t(this.props.error));
        }
      });
  };

  render() {
    return (
      <AddIngredientToFridgeModalForm
        onSubmit={this.handleSubmit}
        avaliableIngredientsToAddToFridge={
          this.props.avaliableIngredientsToAddToFridge
        }
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: getFethingIngredients(state),
    error: getError(state)
  };
};

const mapDispatchToProps = {
  addIngredientToFridge
};

export default withTranslation("common")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIngredientToFridgeModalFormContainer)
);
