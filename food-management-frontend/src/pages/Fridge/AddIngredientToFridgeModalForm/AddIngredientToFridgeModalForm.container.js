import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func } from "prop-types";
import { toast } from "react-toastify";

import AddIngredientToFridgeModalForm from "./AddIngredientToFridgeModalForm.component";
import { addIngredientUser } from "../../../actions/ingredients.actions";

export class AddIngredientToFridgeModalFormContainer extends Component {
  static propTypes = {
    addIngredientUser: func,
    avaliableIngredientsToAddToFridge: array,
    getIngredientsUser: func
  };

  state = {
    ingredientsOptions: []
  };

  handleSubmit = values => {
    return this.props
      .addIngredientUser(JSON.parse(values.ingredient), values.amount)
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
  addIngredientUser
};

export default connect(
  null,
  mapDispatchToProps
)(AddIngredientToFridgeModalFormContainer);
