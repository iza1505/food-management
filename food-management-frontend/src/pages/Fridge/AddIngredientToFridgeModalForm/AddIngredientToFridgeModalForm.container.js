import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";
import { toast } from "react-toastify";

import AddIngredientToFridgeModalForm from "./AddIngredientToFridgeModalForm.component";
import { addIngredientToFridge } from "../../../actions/ingredients.actions";
import { getFethingIngredients } from "../../../selectors/ingredients.selectors";

export class AddIngredientToFridgeModalFormContainer extends Component {
  static propTypes = {
    addIngredientToFridge: func,
    avaliableIngredientsToAddToFridge: array,
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
          toast.error("Niepoprawne dane.");
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
    fetching: getFethingIngredients(state)
  };
};

const mapDispatchToProps = {
  addIngredientToFridge
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientToFridgeModalFormContainer);
