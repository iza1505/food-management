import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, object } from "prop-types";
//import { reset } from "redux-form";
import { bindActionCreators } from "redux";
import cloneDeep from "lodash/cloneDeep";

import UpdateRecipeStatusModal from "./UpdateRecipeStatusModal.component";
import { updateRecipe } from "../../../actions/recipe.actions";
import { getRecipe } from "../../../selectors/recipe.selectors";
import { getSortedIngredients } from "../../../selectors/ingredients.selectors";
import { getSortedIngredients as getSortedIngredientsAction } from "../../../actions/ingredients.actions";

export class UpdateRecipeStatusModalContainer extends Component {
  static propTypes = {
    getSortedIngredientsAction: func,
    ingredients: array,
    initialValues: object,
    updateRecipe: func
  };

  constructor(props) {
    super(props);
    this.props.getSortedIngredientsAction();
  }

  state = {
    ingredientsOptions: [],
    ingredientsRecipe: {}
  };

  componentDidMount() {
    let ingredientsOptionsCopy = [];
    this.props.ingredients.map(elem =>
      elem.measure.measureName
        ? ingredientsOptionsCopy.push({
            label: elem.ingredientName + " (" + elem.measure.measureName + ")",
            value: elem
          })
        : ingredientsOptionsCopy.push({
            label: elem.ingredientName + " (items)",
            value: elem
          })
    );
    this.setState({ ingredientsOptions: ingredientsOptionsCopy });

    // let ingredientsRecipeCopy={};
    // this.props.ingredients.map(elem => ingredientsRecipeCopy.add(elem));
    // this.setState({ ingredientsRecipe: ingredientsRecipeCopy });
  }

  addIngredient = values => {
    console.log(values);
  };

  handleAddIngredient(values) {
    console.log("values: " + JSON.stringify(values));
  }

  handleSubmit = values => {
    console.log("VAL: " + JSON.stringify(values.recipeIngredients));
    //id, version, username -> to ze state, reszta z forma
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
        initialValues={this.props.initialValues}
        ingredients={this.props.ingredients}
        ingredientsOptions={this.state.ingredientsOptions}
        ingredientsRecipe={this.state.ingredientsRecipe}
        handleAddIngredient={this.handleAddIngredient}
      />
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    title: getRecipe(state).title,
    preparationMins: getRecipe(state).preparationMins,
    description: getRecipe(state).description,
    recipeIngredients: getRecipe(state).ingredients
  },
  ingredients: getSortedIngredients(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSortedIngredientsAction: bindActionCreators(
      getSortedIngredientsAction,
      dispatch
    ),
    updateRecipe: bindActionCreators(updateRecipe, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipeStatusModalContainer);
