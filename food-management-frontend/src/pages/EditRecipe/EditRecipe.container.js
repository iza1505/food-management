import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, string } from "prop-types";
import { toast } from "react-toastify";
import _ from "lodash";
import { withTranslation } from "react-i18next";

import { getRecipeDetails, updateRecipe } from "../../actions/recipe.actions";
import { bindActionCreators } from "redux";
import EditRecipe from "./EditRecipe.component";
import {
  getRecipe,
  getFethingRecipe,
  getError
} from "../../selectors/recipe.selectors";
import { getSortedIngredients } from "../../selectors/ingredients.selectors";
import { getSortedIngredients as getSortedIngredientsAction } from "../../actions/ingredients.actions";
import { isPositiveInteger } from "../../configuration/helpers";

export class EditRecipeContainer extends Component {
  static propTypes = {
    error: string,
    fetching: bool,
    getRecipeDetails: func,
    getSortedIngredientsAction: func,
    ingredients: array,
    initialValues: object,
    recipe: object,
    t: func,
    updateRecipe: func
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
      ingredientsOptionsCopy.push({
        label: "select.ingredient",
        value: null
      });
      this.props.ingredients.map(elem =>
        elem.measure.measureName
          ? ingredientsOptionsCopy.push({
              label:
                elem.ingredientName + " (" + elem.measure.measureName + ")",
              value: elem
            })
          : ingredientsOptionsCopy.push({
              label: elem.ingredientName,
              value: elem
            })
      );
      this.setState({ ingredientsOptions: ingredientsOptionsCopy });
    });
  }

  state = {
    recipeId: this.props.match.params.recipeId,
    ingredientsOptions: [],
    selectedIngredient: {},
    selectedAmount: null,
    selectedIngredients: []
  };

  componentDidMount() {
    this.props
      .getRecipeDetails(this.state.recipeId)
      .then(() => {
        if (this.props.recipe.ingredients) {
          this.setState({
            selectedIngredients: [...this.props.recipe.ingredients]
          });
        }
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantDownloadRecipeDetails"));
        }
      });
  }

  redirectToMyRecipes = () => this.props.history.push("/recipes/my");

  handleSubmit = values => {
    let copySelectedIngredients = [...this.state.selectedIngredients];

    if (!_.isEmpty(this.state.selectedIngredients)) {
      this.props
        .updateRecipe(
          this.props.recipe.id,
          this.props.recipe.version,
          values.recipe.title,
          values.recipe.preparationMins,
          values.recipe.description,
          copySelectedIngredients
        )
        .then(() => {
          toast.info(this.props.t("toastInfo.recipeUpdated"));
          this.redirectToMyRecipes();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t(this.props.error));
          }
        });
    } else {
      toast.error(this.props.t("toastInfo.ingredientListCannotBeEmpty"));
    }
  };

  handleDeteleIngredientFromListButton(index) {
    let copySelectedIngredients = [...this.state.selectedIngredients];
    copySelectedIngredients.splice(index, 1);
    this.setState({ selectedIngredients: copySelectedIngredients });
  }

  handleSelectIngredient(e) {
    this.setState({ selectedIngredient: JSON.parse(e.target.value) });
  }

  handleAmountIngredient(e) {
    if (isPositiveInteger(e.target.value)) {
      this.setState({ selectedAmount: e.target.value });
    } else {
      this.setState({ selectedAmount: null });
      toast.error(this.props.t("toastInfo.amountMustBeInteger"));
    }
  }

  handleAddIngredientToList(e) {
    if (
      _.isEmpty(this.state.selectedIngredient) ||
      !this.state.selectedAmount
    ) {
      toast.warn(this.props.t("toastInfo.selectIngredientAmount"));
    } else {
      let iterator = 0;
      this.state.selectedIngredients.forEach((elem, index) => {
        if (_.isEqual(elem.ingredient.id, this.state.selectedIngredient.id)) {
          toast.warn(this.props.t("toastInfo.ingredientAlreadyOnList"));
          iterator++;
        }
      });
      if (iterator === 0) {
        const copySelectedIngredients = [...this.state.selectedIngredients];
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
      <EditRecipe
        onSubmit={this.handleSubmit}
        initialValues={this.props.initialValues}
        ingredientsOptions={this.state.ingredientsOptions}
        fetching={this.props.fetching}
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
  initialValues: {
    recipe: getRecipe(state)
  },
  recipe: getRecipe(state),
  ingredients: getSortedIngredients(state),
  fetching: getFethingRecipe(state),
  error: getError(state)
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

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProps)(EditRecipeContainer)
);
