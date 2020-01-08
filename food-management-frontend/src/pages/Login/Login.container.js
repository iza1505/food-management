import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../actions/user.actions";
import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import Login from "./Login.component";


class LoginContainer extends Component {
  static propTypes = {
    history: object,
    loggedStatus: bool,
    loginUser: func,
    token: string
  };

  _redirectToHomePage = () => this.props.history.push("/");

  handleSubmit = values => {
    return this.props.loginUser(values.login, values.password)
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

  render() {
    return <Login onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    token: getToken(state)
  };
};

const mapDispatchToProps = {
  loginUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)
);
