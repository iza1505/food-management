import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, object, string } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import { getRecipe } from "../../selectors/recipe.selectors";
import { getRecipeDetails } from "../../actions/recipe.actions";
import { getRole } from "../../selectors/user.selectors";
import Recipe from "./Recipe.component";

class RecipeContainer extends Component {
  static propTypes = {
    getRecipeDetails: func,
    recipe: object,
    recipeId: number,
    userRole: string
  };

  constructor(props) {
    super(props);
    this.recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(this.recipeId).catch(err => {
      if (!err.response) {
        toast.warn("Server is unreachable. Check your internet connection.");
      } else {
        toast.error("Can't get details.");
      }
    });
  }

  componentDidMount = () => {
    this.props.getRecipeDetails(this.recipeId).catch(err => {
      if (!err.response) {
        toast.warn("Server is unreachable. Check your internet connection.");
      } else {
        toast.error("Can't get details.");
      }
    });
  };

  render() {
    return <Recipe recipe={this.props.recipe} userRole={this.props.userRole} />;
  }
}

const mapStateToProps = state => ({
  recipe: getRecipe(state),
  userRole: getRole(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRecipeDetails: bindActionCreators(getRecipeDetails, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeContainer)
);
