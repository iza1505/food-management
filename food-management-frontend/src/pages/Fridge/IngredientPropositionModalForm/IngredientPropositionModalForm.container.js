import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, string } from "prop-types";
import { toast } from "react-toastify";

import IngredientPropositionModalForm from "./IngredientPropositionModalForm.component";
import {
  getMeasures as getMeasuresAction,
  addIngredientToDatabase
} from "../../../actions/ingredients.actions";
import { getMeasures } from "../../../selectors/ingredients.selectors";
import { getRole } from "../../../selectors/user.selectors";
import { userRoles } from "../../../configuration/roles";

export class IngredientPropositionModalFormContainer extends Component {
  static propTypes = {
    addIngredientToDatabase: func,
    getMeasuresAction: func,
    measures: array,
    userRole: string
  };

  constructor(props) {
    super(props);

    this.props
      .getMeasuresAction()
      .then(() => {
        this.createMeasuresOptions();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Can't get measures types.");
        }
      });
  }

  state = {
    measureOptions: []
  };

  createMeasuresOptions() {
    const measureOptionsCopy = [];
    this.props.measures.forEach(elem => {
      elem.measureName
        ? measureOptionsCopy.push({
            label: elem.measureName,
            value: elem
          })
        : measureOptionsCopy.push({
            label: "pieces",
            value: elem
          });
    });
    this.setState({
      measureOptions: measureOptionsCopy
    });
  }

  handleSubmit = values => {
    return this.props
      .addIngredientToDatabase(
        values.ingredientName,
        JSON.parse(values.measure)
      )
      .then(() => {
        this.props.userRole === userRoles.user
          ? toast.info("Ingredient has been proposed")
          : toast.info("Ingredient has been added.");
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
      <IngredientPropositionModalForm
        onSubmit={this.handleSubmit}
        userRole={this.props.userRole}
        measures={this.state.measureOptions}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRole: getRole(state),
  measures: getMeasures(state)
});

const mapDispatchToProps = {
  getMeasuresAction,
  addIngredientToDatabase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientPropositionModalFormContainer);
