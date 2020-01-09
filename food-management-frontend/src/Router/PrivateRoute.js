import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { array, bool, string } from "prop-types";

import { getLoggedStatus, getRole } from "../selectors/user.selectors";

class PrivateRoute extends Component {
  static propTypes = {
    canAccess: array,
    loggedStatus: bool,
    roleActive: string
  };

  _redirectToHome = () =>
    window.location.pathname === "/" ? null : <Redirect to="/" />;

  _redirectToLogin = () =>
    window.location.pathname === "/login" ? null : <Redirect to="/login" />;

  haveAccessToRoute = () => {
    let result = false;
    if (this.props.canAccess) {
      if (this.props.canAccess.includes(this.props.roleActive)) {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  };

  render() {
    return this.props.loggedStatus === true ? (
      this.haveAccessToRoute() ? (
        <Route {...this.props} />
      ) : (
        this._redirectToHome()
      )
    ) : (
      this._redirectToLogin()
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    roleActive: getRole(state)
  };
};

//export default PrivateRoute;
export default connect(mapStateToProps, null)(PrivateRoute);
