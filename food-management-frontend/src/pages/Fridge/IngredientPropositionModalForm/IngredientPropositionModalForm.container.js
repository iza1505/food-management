import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import IngredientPropositionModalForm from "./IngredientPropositionModalForm.component";
import {
  getMeasures as getMeasuresAction,
  addIngredientToDatabase,
  getIngredientsAdmin
} from "../../../actions/ingredients.actions";
import {
  getMeasures,
  getFethingIngredients,
  getError
} from "../../../selectors/ingredients.selectors";
import { getRole } from "../../../selectors/user.selectors";
import { userRoles } from "../../../configuration/roles";

export class IngredientPropositionModalFormContainer extends Component {
  static propTypes = {
    addIngredientToDatabase: func,
    dispatch: func,
    error: string,
    fetching: bool,
    getIngredientsAdmin: func,
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
          toast.warn(
            "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          );
        } else {
          toast.error("Nie można pobrać listy miar.");
        }
      });
  }

  state = {
    measureOptions: []
  };

  createMeasuresOptions() {
    const measureOptionsCopy = [];
    measureOptionsCopy.push({
      label: "Wybierz miarę...",
      value: null
    });
    this.props.measures.forEach(elem => {
      elem.measureName
        ? measureOptionsCopy.push({
            label: elem.measureName,
            value: elem
          })
        : measureOptionsCopy.push({
            label: "sztuki",
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
        this.props.getIngredientsAdmin(
          window.location.pathname + window.location.search
        );
        console.log(
          "patj " + window.location.pathname + window.location.search
        );
        this.props.dispatch(reset("ingredientPropositionModalForm"));
        this.props.userRole === userRoles.user
          ? toast.info("Produkt został dodany do listy oczekujących.")
          : toast.info("Produkt został dodany.");
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
  fetching: getFethingIngredients(state),
  error: getError(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getMeasuresAction: bindActionCreators(getMeasuresAction, dispatch),
    addIngredientToDatabase: bindActionCreators(
      addIngredientToDatabase,
      dispatch
    ),
    getIngredientsAdmin: bindActionCreators(getIngredientsAdmin, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientPropositionModalFormContainer);
