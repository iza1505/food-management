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
    //addIngrForm: form
  };

  constructor(props) {
    super(props);
    this.props.getSortedIngredientsAction();
    // this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    // this.handleEditAmountIngredient = this.handleEditAmountIngredient.bind(
    //   this
    // );
  }

  state = {
    recipeId: this.props.match.params.recipeId,
    ingredientsOptions: [],
    recipeIngredientsCopy: []
  };

  componentDidMount() {
    this.props.getRecipeDetails(this.state.recipeId).catch(err => {
      if (!err.response) {
        toast.warn("Server is unreachable. Check your internet connection.");
      } else {
        toast.error("Can't get details.");
      }
    });
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
    this.setState({
      recipeIngredientsCopy: [...this.props.recipe.ingredients]
    });
  }

  addIngredient = values => {
    console.log(values);
  };

  handleAddIngredient = values => {
    //console.log("z modala: " + JSON.stringify(values));
    console.log(
      "pod modalem: " +
        JSON.stringify(this.props.addIngrForm.values.ingredientId)
    );

    const val = JSON.parse(this.props.addIngrForm.values.ingredientId);
    console.log(val);
  };

  handleSubmit = values => {
    let finalIngredients = [];
    values.recipe.ingredients.map((elem, index) => {
      if (!IsJsonString(elem.ingredient)) {
        //console.log(elem.ingredient);
        finalIngredients.push({
          ingredient: elem.ingredient,
          amount: elem.amount
        });
      } else {
        //console.log(JSON.parse(elem.ingredient));
        finalIngredients.push({
          ingredient: JSON.parse(elem.ingredient),
          amount: elem.amount
        });
      }
    });
    console.log(JSON.stringify(finalIngredients));

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

  // handleDeleteIngredient(index) {
  //   const copyOfCopyIngredients = [...this.state.recipeIngredientsCopy];
  //   copyOfCopyIngredients.splice(index, 1);
  //   this.setState({ recipeIngredientsCopy: [...copyOfCopyIngredients] });
  // }

  // handleEditAmountIngredient(e, index, ingredientName) {
  //   const copyOfCopyIngredients = [...this.state.recipeIngredientsCopy];
  //   //console.log(copyOfCopyIngredients[index].amount);
  //   copyOfCopyIngredients[index].amount = e.target.value;
  //   this.setState({ recipeIngredientsCopy: [...copyOfCopyIngredients] });
  //   //console.log(e.target.value + ingredientName);
  // }

  render() {
    return (
      <EditRecipe
        onSubmit={this.handleSubmit}
        initialValues={this.props.initialValues}
        ingredients={this.props.ingredients}
        ingredientsOptions={this.state.ingredientsOptions}
        recipeIngredientsCopy={this.state.recipeIngredientsCopy}
        handleAddIngredient={this.handleAddIngredient}
        editable={this.props.editable}
        recipe={this.props.recipe}
        handleDeleteIngredient={this.handleDeleteIngredient}
        handleEditAmountIngredient={this.handleEditAmountIngredient}
      />
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    recipe: getRecipe(state)
    // preparationMins: getRecipe(state).preparationMins,
    // description: getRecipe(state).description
  },
  recipe: getRecipe(state),
  ingredients: getSortedIngredients(state),
  editable: getEditableRecipe(state)
  //addIngrForm: state.form.addIngredientModalForm
  //recipeIngredients: getRecipe(state).ingredients
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
