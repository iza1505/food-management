import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, number, object, string } from "prop-types";
import { toast } from "react-toastify";
import { formValueSelector } from "redux-form";

import UpdateRecipeStatusModalForm from "./UpdateRecipeStatusModalForm.component";
import { getRecipe } from "../../../selectors/recipe.selectors";
import { updateRecipeStatus } from "../../../actions/recipe.actions";

const selector = formValueSelector("updateRecipeStatusModalForm");

export class UpdateRecipeStatusModalFormContainer extends Component {
  static propTypes = {
    isActive: bool,
    isWaitingForAccept: bool,
    recipe: object,
    updateRecipeStatus: func
  };

  state = {
    active: this.props.recipe.active,
    waitingForAccept: this.props.recipe.waitingForAccept,
    toImprove: this.props.recipe.toImprove,
    version: this.props.recipe.version,
    recipeId: this.props.recipe.id
  };

  shouldComponentUpdate(nextProps) {
    if (this.state.recipeId === nextProps.recipe.id) {
      if (
        this.props.isActive !== nextProps.isActive ||
        this.props.isWaitingForAccept !== nextProps.isWaitingForAccept
      ) {
        return true;
      }
      return false;
    } else {
      this.setState({
        active: nextProps.recipe.active,
        waitingForAccept: nextProps.recipe.waitingForAccept,
        toImprove: nextProps.recipe.toImprove,
        version: nextProps.recipe.version,
        recipeId: nextProps.recipe.id
      });
      return true;
    }
  }

  handleSubmit = values => {
    console.log(JSON.stringify(values));
    // return this.props
    //   .updateRecipeStatus(this.state.recipeId, this.state.version, values.active, values.waitingForAccept, values.toImprove)
    //   .then(() => {
    //     toast.info("Recipe status has been changed.");
    //   })
    //   .catch(err => {
    //     if (!err.response) {
    //       toast.warn("Server is unreachable. Check your internet connection.");
    //     } else {
    //       toast.error("Cannot change recipe status.");
    //     }
    //   });
  };

  render() {
    return (
      <UpdateRecipeStatusModalForm
        onSubmit={this.handleSubmit}
        initialValues={{
          toImprove: this.state.toImprove,
          active: this.state.active,
          waitingForAccept: this.state.waitingForAccept
        }}
        isActive={this.props.isActive}
        isWaitingForAccept={this.props.isWaitingForAccept}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: getRecipe(state),
  isActive: selector(state, "active"),
  isWaitingForAccept: selector(state, "waitingForAccept")
});

const mapDispatchToProps = {
  updateRecipeStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipeStatusModalFormContainer);
