import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, object, func } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, getFormSyncErrors } from "redux-form";
import { bindActionCreators } from "redux";

import { getLoggedStatus } from "../../selectors/user.selectors";
import RegistrationAndMore from "./RegistrationAndMore.component";
import {
  register,
  sendConfirmationMail,
  sendResetPasswordMail
} from "./../../actions/user.actions";

class RegistrationAndMoreContainer extends Component {
  static propTypes = {
    dispatch: func,
    history: object,
    loggedStatus: bool,
    register: func
  };

  state = {
    login: "",
    email: ""
  };

  constructor(props) {
    super(props);
    this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this);
    this.handleSendConfirmationMail = this.handleSendConfirmationMail.bind(
      this
    );
    this.handleSendResetPasswordMail = this.handleSendResetPasswordMail.bind(
      this
    );
    this.props.dispatch(reset("registrationform"));
  }

  changeState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    if (this.props.loggedStatus) {
      return this._redirectToHomePage();
    }
  }

  _redirectToHomePage = () => this.props.history.push("/");

  handleSubmit = values => {
    return this.props
      .register(values.login, values.emailToSign, values.password)
      .then(() => {
        toast.info("Confirmation email was send.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid registration data.");
        }
      });
  };
  handleSubmitRegistration(e) {
    e.preventDefault();
    return this.props
      .register(
        e.target.loginSignIn.value,
        e.target.emailSignIn.value,
        e.target.password.value
      )
      .then(() => {
        toast.info("Confirmation email was send.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid registration data.");
        }
      });
  }

  handleSendConfirmationMail(e) {
    e.preventDefault();
    console.log("Confirm account: " + e.target.email.value);
    return this.props
      .sendConfirmationMail(e.target.login.value, e.target.email.value)
      .then(() => {
        toast.info("Confirmation email was send.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid data.");
        }
      });
  }

  handleSendResetPasswordMail(e) {
    e.preventDefault();
    
    return this.props
      .sendResetPasswordMail(this.state.login, this.state.email)
      .then(() => {
        toast.info("Change password email was send.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid data.");
        }
      });
    //console.log("dane: " + this.state.login + this.state.email);
  }

  render() {
    return (
      <RegistrationAndMore
        changeState={this.changeState}
        handleSubmitRegistration={this.handleSubmitRegistration}
        handleSendConfirmationMail={this.handleSendConfirmationMail}
        handleSendResetPasswordMail={this.handleSendResetPasswordMail}
        onSubmit={this.handleSubmit}
      />
    );
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
    dispatch,
    register: bindActionCreators(register, dispatch),
    sendConfirmationMail: bindActionCreators(sendConfirmationMail, dispatch),
    sendResetPasswordMail: bindActionCreators(sendResetPasswordMail, dispatch)
  };
}

//sendConfirmationMail,
//sendResetPasswordMail

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationAndMoreContainer)
);
