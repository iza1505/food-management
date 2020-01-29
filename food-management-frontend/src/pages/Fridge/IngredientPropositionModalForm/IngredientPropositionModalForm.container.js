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
    url: string,
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
      label: "select.measure",
      value: null
    });

    this.props.measures.forEach(elem => {
      elem.measureName
        ? measureOptionsCopy.push({
            label: elem.measureName,
            value: elem
          })
        : measureOptionsCopy.push({
            label: "—",
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
        if (this.props.userRole === userRoles.admin) {
          this.props.getIngredientsAdmin(this.props.url).then(() => {
            this.props.dispatch(reset("ingredientPropositionModalForm"));
            toast.info("Produkt został dodany.");
          });
        } else {
          this.props.dispatch(reset("ingredientPropositionModalForm"));
          toast.info("Produkt został dodany do listy oczekujących.");
        }
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
