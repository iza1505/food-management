import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "redux-form";

import RegistrationAndMore from "./RegistrationAndMore.component";

class RegistrationAndMoreContainer extends Component {
  static propTypes = {
    history: object,
    loggedStatus: bool,
    dispatch: func
  };

  constructor(props) {
    super(props);
    this.props.dispatch(reset("registrationform"));
  }

  componentDidMount() {
    if (this.props.loggedStatus) {
      return this._redirectToHomePage();
    }
  }

  _redirectToHomePage = () => this.props.history.push("/");

  handleSubmitSendEmail = values => {
    return this.props
      .loginUser(values.login, values.password)
      .then(() => {
        if (this.props.loggedStatus && this.props.token) {
          this._redirectToHomePage();
        }
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid Username or Password");
        }
      });
  };
  //handleSubmitSignIn, handleSubmitSendEmail

  render() {
    return <RegistrationAndMore onSubmit={this.handleSubmit} />;
  }
}

// const mapStateToProps = state => {

// };

// const mapDispatchToProps = {

// };

export default withRouter(connect(null, null)(RegistrationAndMoreContainer));
