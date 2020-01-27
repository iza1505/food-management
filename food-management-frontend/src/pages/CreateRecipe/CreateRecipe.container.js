import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, string } from "prop-types";
import { toast } from "react-toastify";
import _ from "lodash";
import { reset } from "redux-form";

import { bindActionCreators } from "redux";
import CreateRecipe from "./CreateRecipe.component";
import { addRecipe } from "../../actions/recipe.actions";
import { getSortedIngredients } from "../../selectors/ingredients.selectors";
import { getFethingRecipe, getError } from "../../selectors/recipe.selectors";
import { getSortedIngredients as getSortedIngredientsAction } from "../../actions/ingredients.actions";
import { isPositiveInteger } from "../../configuration/helpers";

export class CreateRecipeContainer extends Component {
  static propTypes = {
    addRecipe: func,
    dispatch: func,
    editable: bool,
    error: string,
    fetching: bool,
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
      ingredientsOptionsCopy.push({
        label: "Wybierz składnik...",
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
              label: elem.ingredientName + " (sztuki)",
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
          toast.info("Przepis został utworzony.");
          this.props.dispatch(reset("createRecipeForm"));
          this.redirectToMyRecipes();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(
              "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
            );
          } else {
            toast.error(this.props.error);
          }
        });
    } else {
      toast.error("Lista składników nie może być pusta.");
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
    if (isPositiveInteger(e.target.value)) {
      this.setState({ selectedAmount: e.target.value });
    } else {
      this.setState({ selectedAmount: null });
      toast.error("Ilość musi być liczbą całkowitą większą od 0.");
    }
  }

  handleAddIngredientToList(e) {
    if (
      _.isEmpty(this.state.selectedIngredient) ||
      !this.state.selectedAmount
    ) {
      toast.warn("Wybierz składnik i podaj poprawną ilość aby dodać do listy.");
    } else {
      let iterator = 0;
      this.state.selectedIngredients.forEach((elem, index) => {
        if (_.isEqual(elem.ingredient.id, this.state.selectedIngredient.id)) {
          toast.warn(
            "Składnik znajduje się już na liście. (pozycja " +
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
    addRecipe: bindActionCreators(addRecipe, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipeContainer);
