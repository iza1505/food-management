import React, { Component } from "react";
// import { connect } from "react-redux";
import { bool, func, string } from "prop-types";

import Header from "./Header.component";
//import { logoutUser } from "../../../../actions/user.actions";
// import {
//   getLoggedStatus,
//   getLogin,
//   getRoleActive
// } from "../../../../selectors/user.selectors";

export class HeaderContainer extends Component {
  static propTypes = {
    loggedStatus: bool,
    login: string,
    logoutUser: func,
    roleActive: string
  };

  handleLogout = () => {
    console.log("wylogowany");
    // this.props.logoutUser();
  };

  render() {
    return (
      <Header
        loggedStatus={true}
        login={"henlo"}
        logout={this.handleLogout}
        roleActive={"User"}
        // loggedStatus={this.props.loggedStatus}
        // login={this.props.login}
        // logout={this.handleLogout}
        // roleActive={this.props.roleActive}
      />
    );
  }
}

// const mapStateToProps = state => ({
//   loggedStatus: getLoggedStatus(state),
//   login: getLogin(state),
//   roleActive: getRoleActive(state)
// });

// const mapDispatchToProps = {
//   logoutUser
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
export default HeaderContainer;
