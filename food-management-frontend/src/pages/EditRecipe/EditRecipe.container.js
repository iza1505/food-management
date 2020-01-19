import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, form, object } from "prop-types";
import { toast } from "react-toastify";
//import { reset } from "redux-form";

import { getRecipeDetails } from "../../actions/recipe.actions";
import { bindActionCreators } from "redux";
import EditRecipe from "./EditRecipe.component";
import { updateRecipe } from "../../actions/recipe.actions";
import { getRecipe, getEditableRecipe } from "../../selectors/recipe.selectors";
import { getSortedIngredients } from "../../selectors/ingredients.selectors";
import { getSortedIngredients as getSortedIngredientsAction } from "../../actions/ingredients.actions";
import { IsJsonString } from "../../configuration/helpers";

export class EditRecipeContainer extends Component {
  static propTypes = {
    getRecipeDetails: func,
    getSortedIngredientsAction: func,
    ingredients: array,
    initialValues: object,
    recipe: object,
    updateRecipe: func,
    editable: bool
  };

  constructor(props) {
    super(props);
    this.props.getSortedIngredientsAction().then(() => {
      let ingredientsOptionsCopy = [];
      this.props.ingredients.map(elem =>
        elem.measure.measureName
          ? ingredientsOptionsCopy.push({
              label:
                elem.ingredientName + " (" + elem.measure.measureName + ")",
              value: elem
            })
          : ingredientsOptionsCopy.push({
              label: elem.ingredientName + " (items)",
              value: elem
            })
      );
      this.setState({ ingredientsOptions: ingredientsOptionsCopy });
    });
  }

  state = {
    recipeId: this.props.match.params.recipeId,
    ingredientsOptions: []
  };

  componentDidMount() {
    this.props.getRecipeDetails(this.state.recipeId).catch(err => {
      if (!err.response) {
        toast.warn("Server is unreachable. Check your internet connection.");
      } else {
        toast.error("Can't get details.");
      }
    });
  }

  handleSubmit = values => {
    let finalIngredients = [];
    values.recipe.ingredients.map(elem => {
      if (!IsJsonString(elem.ingredient)) {
        finalIngredients.push({
          ingredient: elem.ingredient,
          amount: elem.amount
        });
      } else {
        finalIngredients.push({
          ingredient: JSON.parse(elem.ingredient),
          amount: elem.amount
        });
      }
    });

    this.props
      .updateRecipe(
        this.props.recipe.id,
        this.props.recipe.version,
        values.recipe.title,
        values.recipe.preparationMins,
        values.recipe.description,
        "user",
        finalIngredients
      )
      .then(() => {
        toast.info("Details have been changed.");
        window.location.reload();
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
      <EditRecipe
        onSubmit={this.handleSubmit}
        initialValues={this.props.initialValues}
        ingredientsOptions={this.state.ingredientsOptions}
        editable={this.props.editable}
      />
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    recipe: getRecipe(state)
  },
  recipe: getRecipe(state),
  ingredients: getSortedIngredients(state),
  editable: getEditableRecipe(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSortedIngredientsAction: bindActionCreators(
      getSortedIngredientsAction,
      dispatch
    ),
    updateRecipe: bindActionCreators(updateRecipe, dispatch),
    getRecipeDetails: bindActionCreators(getRecipeDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipeContainer);
