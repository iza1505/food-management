import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object } from "prop-types";
import { toast } from "react-toastify";
import _ from "lodash";
import { reset } from "redux-form";

import { bindActionCreators } from "redux";
import CreateRecipe from "./CreateRecipe.component";
import { addRecipe } from "../../actions/recipe.actions";
import { getSortedIngredients } from "../../selectors/ingredients.selectors";
import { getSortedIngredients as getSortedIngredientsAction } from "../../actions/ingredients.actions";

export class CreateRecipeContainer extends Component {
  static propTypes = {
    addRecipe: func,
    dispatch: func,
    editable: bool,
    getSortedIngredientsAction: func,
    ingredients: array,
    initialValues: object
  };

  constructor(props) {
    super(props);
    this.handleSelectIngredient = this.handleSelectIngredient.bind(this);
    this.handleAmountIngredient = this.handleAmountIngredient.bind(this);
    this.handleAddIngredientToList = this.handleAddIngredientToList.bind(this);
    this.handleDeteleIngredientFromListButton = this.handleDeteleIngredientFromListButton.bind(
      this
    );

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
              label: elem.ingredientName + " (pieces)",
              value: elem
            })
      );
      this.setState({ ingredientsOptions: ingredientsOptionsCopy });
    });
  }

  state = {
    ingredientsOptions: [],
    selectedIngredient: {},
    selectedAmount: null,
    selectedIngredients: []
  };

  componentDidMount() {}

  handleSubmit = values => {
    let copySelectedIngredients = [...this.state.selectedIngredients];

    if (!_.isEmpty(this.state.selectedIngredients)) {
      this.props
        .addRecipe(
          values.recipe.title,
          values.recipe.preparationMins,
          values.recipe.description,
          copySelectedIngredients
        )
        .then(() => {
          toast.info("Recipe has been added.");
          this.props.dispatch(reset("createRecipeForm"));
          this.redirectToMyRecipes();
          //this.setState({ selectedIngredients: {} });
          //window.location.reload();
          //TODO: przeniesc sie do moich przepisow
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(
              "Server is unreachable. Check your internet connection."
            );
          } else {
            toast.error("Invalid data.");
          }
        });
    } else {
      toast.error("Ingredients list cannot be empty.");
    }
  };

  redirectToMyRecipes = () => this.props.history.push("/recipes/my");

  handleDeteleIngredientFromListButton(index) {
    let copySelectedIngredients = [...this.state.selectedIngredients];
    copySelectedIngredients.splice(index, 1);
    this.setState({ selectedIngredients: copySelectedIngredients });
  }

  handleSelectIngredient(e) {
    this.setState({ selectedIngredient: JSON.parse(e.target.value) });
  }

  handleAmountIngredient(e) {
    this.setState({ selectedAmount: e.target.value });
  }

  handleAddIngredientToList(e) {
    if (
      _.isEmpty(this.state.selectedIngredient) ||
      !this.state.selectedAmount
    ) {
      toast.warn("Select ingredient and type amount to add to list.");
    } else {
      let iterator = 0;
      this.state.selectedIngredients.forEach((elem, index) => {
        if (_.isEqual(elem.ingredient.id, this.state.selectedIngredient.id)) {
          toast.warn(
            "This ingredient is already on list. (position " +
              Number(index + 1) +
              ")"
          );
          iterator++;
        }
      });
      if (iterator === 0) {
        let copySelectedIngredients = [...this.state.selectedIngredients];
        copySelectedIngredients.push({
          ingredient: this.state.selectedIngredient,
          amount: this.state.selectedAmount
        });
        this.setState({ selectedIngredients: copySelectedIngredients });
      }
    }
  }

  render() {
    return (
      <CreateRecipe
        onSubmit={this.handleSubmit}
        initialValues={this.props.initialValues}
        ingredientsOptions={this.state.ingredientsOptions}
        editable={this.props.editable}
        selectedIngredients={this.state.selectedIngredients}
        handleSelectIngredient={this.handleSelectIngredient}
        handleAmountIngredient={this.handleAmountIngredient}
        handleAddIngredientToList={this.handleAddIngredientToList}
        handleDeteleIngredientFromListButton={
          this.handleDeteleIngredientFromListButton
        }
        selectedIngredient={this.state.selectedIngredient}
      />
    );
  }
}

const mapStateToProps = state => ({
  ingredients: getSortedIngredients(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSortedIngredientsAction: bindActionCreators(
      getSortedIngredientsAction,
      dispatch
    ),
    addRecipe: bindActionCreators(addRecipe, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipeContainer);
