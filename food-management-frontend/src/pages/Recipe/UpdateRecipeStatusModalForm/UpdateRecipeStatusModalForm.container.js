import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, object } from "prop-types";
import { toast } from "react-toastify";
import { formValueSelector } from "redux-form";

import UpdateRecipeStatusModalForm from "./UpdateRecipeStatusModalForm.component";
import {
  getRecipe,
  getFethingRecipe
} from "../../../selectors/recipe.selectors";
import { updateRecipeStatus } from "../../../actions/recipe.actions";

const selector = formValueSelector("updateRecipeStatusModalForm");

export class UpdateRecipeStatusModalFormContainer extends Component {
  static propTypes = {
    fetching: bool,
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
    if (this.props.fetching === nextProps.fetching) {
      if (
        this.state.recipeId === nextProps.recipe.id &&
        this.state.version === nextProps.recipe.version
      ) {
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
    } else {
      return true;
    }
  }

  handleSubmit = values => {
    return this.props
      .updateRecipeStatus(
        this.state.recipeId,
        this.state.version,
        values.active,
        values.waitingForAccept,
        values.toImprove
      )
      .then(() => {
        toast.info("Status przepisu został zmieniony.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(
            "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          );
        } else {
          toast.error("Nie można zmienic statusu przepisu.");
        }
      });
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
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: getRecipe(state),
  isActive: selector(state, "active"),
  isWaitingForAccept: selector(state, "waitingForAccept"),
  fetching: getFethingRecipe(state)
});

const mapDispatchToProps = {
  updateRecipeStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipeStatusModalFormContainer);
