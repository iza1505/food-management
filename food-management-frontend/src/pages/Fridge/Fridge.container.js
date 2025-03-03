import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { withTranslation } from "react-i18next";

import Fridge from "./Fridge.component";
import {
  getIngredientsUser,
  deleteIngredientsUser,
  updateIngredientUser,
  getSortedIngredients as getSortedIngredientsAction
} from "../../actions/ingredients.actions";
import {
  getIngredients,
  getFethingIngredients,
  getSortedIngredients
} from "../../selectors/ingredients.selectors";
import { isPositiveInteger } from "../../configuration/helpers";

class FridgeContainer extends Component {
  static propTypes = {
    allSortedIngredients: array,
    deleteIngredientsUser: func,
    fetchingIngredients: bool,
    getIngredientsUser: func,
    getSortedIngredientsAction: func,
    ingredients: array,
    t: func,
    updateIngredientUser: func
  };

  state = {
    avaliableIngredientsToAddToFridge: []
  };

  constructor(props) {
    super(props);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleSaveChangesIngredient = this.handleSaveChangesIngredient.bind(
      this
    );

    this.props.getSortedIngredientsAction();
  }

  componentDidMount() {
    this.props
      .getIngredientsUser()
      .then(() => {
        this.updateAvaliableIngredientsToAdd();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantDownloadProducts"));
        }
      });
  }

  componentDidUpdate() {
    this.updateAvaliableIngredientsToAdd();
  }

  updateAvaliableIngredientsToAdd() {
    const ingredientsOptionsCopy = [];
    ingredientsOptionsCopy.push({
      label: "select.ingredient",
      value: null
    });
    this.props.allSortedIngredients.forEach(elem => {
      let iterator = 0;
      this.props.ingredients.forEach(ingr => {
        if (_.isEqual(elem.id, ingr.ingredient.id)) {
          iterator++;
        }
      });
      if (iterator === 0) {
        elem.measure.measureName
          ? ingredientsOptionsCopy.push({
              label:
                elem.ingredientName + " (" + elem.measure.measureName + ")",
              value: elem
            })
          : ingredientsOptionsCopy.push({
              label: elem.ingredientName,
              value: elem
            });
      }
    });
    if (
      !_.isEqual(
        this.state.avaliableIngredientsToAddToFridge,
        ingredientsOptionsCopy
      )
    ) {
      this.setState({
        avaliableIngredientsToAddToFridge: ingredientsOptionsCopy
      });
    }
  }

  handleDeleteIngredient(id) {
    this.props
      .deleteIngredientsUser(id)
      .then(() => {
        this.props.getIngredientsUser().catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadProducts"));
          }
        });
        this.updateAvaliableIngredientsToAdd();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantDeleteProduct"));
        }
      });
  }

  handleSaveChangesIngredient(e) {
    const ingredientId = Number(e.target.name);
    if (isPositiveInteger(e.target.value)) {
      const ingredientToUpdate = this.props.ingredients.find(e =>
        _.isEqual(e.ingredient.id, ingredientId)
      );
      ingredientToUpdate.amount = Number(e.target.value);
      this.props
        .updateIngredientUser(ingredientToUpdate)
        .then(() => {
          this.props.getIngredientsUser().catch(err => {
            if (!err.response) {
              toast.warn(this.props.t("toastInfo.unreachableServer"));
            } else {
              toast.error(this.props.t("toastInfo.cantDownloadProducts"));
            }
          });
          toast.info(this.props.t("toastInfo.quantityHasBeenChanged"));
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantUpdateProduct"));
          }
        });
    } else {
      toast.error(this.props.t("toastInfo.amountMustBeInteger"));
    }
  }

  render() {
    return (
      <Fridge
        ingredients={this.props.ingredients}
        handleDeleteIngredient={this.handleDeleteIngredient}
        handleSaveChangesIngredient={this.handleSaveChangesIngredient}
        fetchingIngredients={this.props.fetchingIngredients}
        avaliableIngredientsToAddToFridge={
          this.state.avaliableIngredientsToAddToFridge
        }
        getIngredientsUser={this.props.getIngredientsUser}
      />
    );
  }
}

const mapDispatchToProps = {
  getIngredientsUser,
  deleteIngredientsUser,
  updateIngredientUser,
  getSortedIngredientsAction
};

const mapStateToProps = state => ({
  ingredients: getIngredients(state),
  fetchingIngredients: getFethingIngredients(state),
  allSortedIngredients: getSortedIngredients(state)
});

export default withTranslation("common")(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(FridgeContainer))
);
