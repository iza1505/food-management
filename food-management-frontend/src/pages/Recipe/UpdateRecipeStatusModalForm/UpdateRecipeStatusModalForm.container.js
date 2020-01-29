import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, object } from "prop-types";
import { toast } from "react-toastify";
import { formValueSelector } from "redux-form";
import { withTranslation } from "react-i18next";

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
    t: func,
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
        toast.info(this.props.t("toastInfo.recipeStatusHasBeenChanged"));
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantChangeRecipeStatus"));
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

export default withTranslation("common")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateRecipeStatusModalFormContainer)
);
