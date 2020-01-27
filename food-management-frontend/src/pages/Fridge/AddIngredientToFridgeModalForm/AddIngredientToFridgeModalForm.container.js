import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import { toast } from "react-toastify";

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
    getIngredientsUser: func
  };

  handleSubmit = values => {
    return this.props
      .addIngredientToFridge(JSON.parse(values.ingredient), values.amount)
      .then(() => {
        toast.info("Produkt został dodany.");
        this.props.getIngredientsUser();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(
            "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          );
        } else {
          toast.error(this.props.error);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientToFridgeModalFormContainer);
