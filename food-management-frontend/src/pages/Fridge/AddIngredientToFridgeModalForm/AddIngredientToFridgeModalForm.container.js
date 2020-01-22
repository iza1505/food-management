import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func } from "prop-types";
import { toast } from "react-toastify";

import AddIngredientToFridgeModalForm from "./AddIngredientToFridgeModalForm.component";
import { addIngredientToFridge } from "../../../actions/ingredients.actions";

export class AddIngredientToFridgeModalFormContainer extends Component {
  static propTypes = {
    addIngredientToFridge: func,
    avaliableIngredientsToAddToFridge: array,
    getIngredientsUser: func
  };

  handleSubmit = values => {
    return this.props
      .addIngredientToFridge(JSON.parse(values.ingredient), values.amount)
      .then(() => {
        toast.info("Ingredient has been added.");
        this.props.getIngredientsUser();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid data.");
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
      />
    );
  }
}

const mapDispatchToProps = {
  addIngredientToFridge
};

export default connect(
  null,
  mapDispatchToProps
)(AddIngredientToFridgeModalFormContainer);
