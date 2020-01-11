import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import { resetPassword } from "../../actions/user.actions";
import ChangePasswordMail from "./ChangePasswordMail.component";

class ChangePasswordMailContainer extends Component {
  static propTypes = {
    dispatch: func,
    resetPassword: func
  };

  state = {
    token: null
  };

  constructor(props) {
    super(props);
    this.props.dispatch(reset("changePasswordForm"));
  }

  handleSubmit = values => {
    const parsed = querySearch.parse(this.props.location.search);
    const url = window.location.pathname + "?token=" + parsed.token;

    this.props
      .resetPassword(url, values.password1)
      .then(() => {
        toast.info("Your password has been changed");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid data.");
        }
      });
  };

  render() {
    return <ChangePasswordMail onSubmit={this.handleSubmit} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPassword: bindActionCreators(resetPassword, dispatch)
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(ChangePasswordMailContainer)
);
