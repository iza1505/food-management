import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import IngredientPropositionModalForm from "./IngredientPropositionModalForm.component";
import {
  getMeasures as getMeasuresAction,
  addIngredientToDatabase
} from "../../../actions/ingredients.actions";
import {
  getMeasures,
  getFethingIngredients
} from "../../../selectors/ingredients.selectors";
import { getRole } from "../../../selectors/user.selectors";
import { userRoles } from "../../../configuration/roles";

export class IngredientPropositionModalFormContainer extends Component {
  static propTypes = {
    addIngredientToDatabase: func,
    dispatch: func,
    fetching: bool,
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
    measureOptionsCopy.push({
      label: "Select measure...",
      value: ""
    });
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
        this.props.dispatch(reset("ingredientPropositionModalForm"));
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
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRole: getRole(state),
  measures: getMeasures(state),
  fetching: getFethingIngredients(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getMeasuresAction: bindActionCreators(getMeasuresAction, dispatch),
    addIngredientToDatabase: bindActionCreators(
      addIngredientToDatabase,
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientPropositionModalFormContainer);
