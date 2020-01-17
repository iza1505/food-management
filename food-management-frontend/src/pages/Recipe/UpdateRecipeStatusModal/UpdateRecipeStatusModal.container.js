import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";

import UpdateRecipeStatusModal from "./UpdateRecipeStatusModal.component";
import { updateRecipe } from "../../../actions/recipe.actions";
import { getRecipe } from "../../../selectors/recipe.selectors";
import { getSortedIngredients } from "../../../selectors/ingredients.selectors";
import { getSortedIngredients as getSIngredients } from "../../../actions/ingredients.actions";

export class UpdateRecipeStatusModalContainer extends Component {
  static propTypes = {
    getSIngredients: func,
    ingredients: object,
    recipe: object,
    updateRecipe: func
  };

  constructor(props) {
    super(props);

    this.props.getSIngredients();
  }

  handleSubmit = values => {
    //   return this.props
    //   id,
    // version,
    // title,
    // preparationMins,
    // description,
    // userName,
    // ingredients
    //     .updateRecipe(values.email, this.props.version)
    //     .then(() => {
    //       toast.info("Details have been changed.");
    //     })
    //     .catch(err => {
    //       if (!err.response) {
    //         toast.warn("Server is unreachable. Check your internet connection.");
    //       } else {
    //         toast.error("Invalid data.");
    //       }
    //     });
  };

  render() {
    return (
      <UpdateRecipeStatusModal
        onSubmit={this.handleSubmit}
        ingredients={this.props.ingredients}
        recipe={this.props.recipe}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: getRecipe(state),
  ingredients: getSortedIngredients(state)
});

const mapDispatchToProps = {
  updateRecipe,
  getSIngredients
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipeStatusModalContainer);
