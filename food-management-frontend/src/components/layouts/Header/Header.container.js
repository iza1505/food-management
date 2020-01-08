import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string, object } from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "./Header.component";
import { logoutUser } from "./../../../actions/user.actions";
import {
  getLoggedStatus,
  getLogin,
  getRole
} from "./../../../selectors/user.selectors";

export class HeaderContainer extends Component {
  static propTypes = {
    history: object,
    loggedStatus: bool,
    login: string,
    logoutUser: func,
    roleActive: string
  };

  _redirectToLoginPage = () => this.props.history.push("/login");

  handleLogout = () => {
    this.props.logoutUser();
    return this._redirectToLoginPage();
  };

  render() {
    return (
      <Header
        loggedStatus={this.props.loggedStatus}
        login={this.props.login}
        logout={this.handleLogout}
        roleActive={this.props.roleActive}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedStatus: getLoggedStatus(state),
  login: getLogin(state),
  roleActive: getRole(state)
});

const mapDispatchToProps = {
  logoutUser
};

//export default HeaderContainer;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);

