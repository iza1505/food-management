import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";

import Fridge from "./Fridge.component";
import {
  getIngredientsUser,
  deleteIngredientsUser,
  updateIngredientUser
} from "../../actions/ingredients.actions";
import {
  getIngredients,
  getFethingIngredients
} from "../../selectors/ingredients.selectors";

class FridgeContainer extends Component {
  static propTypes = {
    deleteIngredientsUser: func,
    getIngredientsUser: func,
    history: object,
    ingredients: array,
    updateIngredientUser: func,
    fetchingIngredients: bool
  };

  state = {
    ingredientToUpdate2: {}
  };

  constructor(props) {
    super(props);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleSaveChangesIngredient = this.handleSaveChangesIngredient.bind(
      this
    );
  }

  componentDidMount() {
    this.props
      .getIngredientsUser()
      .then(() => {
        console.log("pobrane");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Can't get ingredients.");
        }
      });
  }

  handleDeleteIngredient(id) {
    this.props
      .deleteIngredientsUser(id)
      .then(() => {
        this.props.getIngredientsUser();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Can't delete ingredients.");
        }
      });
  }

  handleSaveChangesIngredient(e) {
    const ingredientId = Number(e.target.name);
    if (isPositiveInteger(e.target.value)) {
      let ingredientToUpdate = this.props.ingredients.find(e =>
        _.isEqual(e.ingredient.id, ingredientId)
      );
      ingredientToUpdate.amount = Number(e.target.value);
      this.props
        .updateIngredientUser(ingredientToUpdate)
        .then(() => {
          this.props.getIngredientsUser();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(
              "Server is unreachable. Check your internet connection."
            );
          } else {
            toast.error("Can't update ingredient.");
          }
        });
    } else {
      toast.error("Amount must be positive integer.");
    }
  }

  render() {
    console.log(this.props.ingredients);
    return (
      <Fridge
        ingredients={this.props.ingredients}
        handleDeleteIngredient={this.handleDeleteIngredient}
        handleSaveChangesIngredient={this.handleSaveChangesIngredient}
        fetchingIngredients={this.props.fetchingIngredients}
      />
    );
  }
}

function isPositiveInteger(n) {
  var floatN = parseFloat(n);
  return !isNaN(floatN) && isFinite(n) && floatN > 0 && floatN % 1 == 0;
}

const mapDispatchToProps = {
  getIngredientsUser,
  deleteIngredientsUser,
  updateIngredientUser
};

const mapStateToProps = state => ({
  ingredients: getIngredients(state),
  fetchingIngredients: getFethingIngredients(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FridgeContainer)
);
