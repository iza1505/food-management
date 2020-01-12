import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, object, func } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, getFormSyncErrors } from "redux-form";

import { getLoggedStatus } from "../../selectors/user.selectors";
import RegistrationAndMore from "./RegistrationAndMore.component";

class RegistrationAndMoreContainer extends Component {
  static propTypes = {
    dispatch: func,
    history: object,
    loggedStatus: bool
  };

  constructor(props) {
    super(props);
    this.props.dispatch(reset("registrationform"));
    this.props.dispatch(reset("registrationModalForm"));
    this.props.dispatch(reset("resetPasswordModalForm"));
    this.props.dispatch(reset("confirmationEmailModalForm"));
  }

  componentDidMount() {
    if (this.props.loggedStatus) {
      return this._redirectToHomePage();
    }
  }

  _redirectToHomePage = () => this.props.history.push("/");

  render() {
    return <RegistrationAndMore />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    formErrors: getFormSyncErrors("registrationform")(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationAndMoreContainer)
);
