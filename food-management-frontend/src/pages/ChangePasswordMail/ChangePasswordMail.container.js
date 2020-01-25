import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import { resetPassword } from "../../actions/user.actions";
import { getFetchingUser } from "../../selectors/user.selectors";
import ChangePasswordMail from "./ChangePasswordMail.component";

class ChangePasswordMailContainer extends Component {
  static propTypes = {
    dispatch: func,
    fetching: bool,
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
    return (
      <ChangePasswordMail
        onSubmit={this.handleSubmit}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  fetching: getFetchingUser(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPassword: bindActionCreators(resetPassword, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePasswordMailContainer)
);
