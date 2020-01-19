import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { toast } from "react-toastify";

import AddIngredientToFridgeModalForm from "./AddIngredientToFridgeModalForm.component";
import { addIngredientUser } from "../../../actions/ingredients.actions";

export class AddIngredientToFridgeModalFormContainer extends Component {
  static propTypes = {
    addIngredientUser: func
  };

  handleSubmit = values => {
    return this.props
      .addIngredientUser(values.oldPassword, values.password1)
      .then(() => {
        toast.info("Ingredient has been added.");
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
    return <AddIngredientToFridgeModalForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  addIngredientUser
};

export default connect(
  null,
  mapDispatchToProps
)(AddIngredientToFridgeModalFormContainer);
