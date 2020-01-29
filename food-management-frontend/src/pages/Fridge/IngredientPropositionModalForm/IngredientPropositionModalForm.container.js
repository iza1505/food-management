import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

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
    t: func,
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
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantDownloadMeasures"));
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
        if (this.props.userRole === userRoles.manager) {
          this.props.getIngredientsAdmin(this.props.url).then(() => {
            this.props.dispatch(reset("ingredientPropositionModalForm"));
            toast.info(this.props.t("toastInfo.productHasBeenAdded"));
          });
        } else {
          this.props.dispatch(reset("ingredientPropositionModalForm"));
          toast.info(this.props.t("toastInfo.productHasBeenSuggest"));
        }
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t(this.props.error));
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

export default withTranslation("common")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IngredientPropositionModalFormContainer)
);
