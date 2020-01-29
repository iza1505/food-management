import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

import { resetPassword } from "../../actions/user.actions";
import { getFetchingUser, getError } from "../../selectors/user.selectors";
import ChangePasswordMail from "./ChangePasswordMail.component";

class ChangePasswordMailContainer extends Component {
  static propTypes = {
    dispatch: func,
    error: string,
    fetching: bool,
    resetPassword: func,
    t: func
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
        toast.info(this.props.t("toastInfo.passwordHasBeenChanged"));
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
      <ChangePasswordMail
        onSubmit={this.handleSubmit}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  fetching: getFetchingUser(state),
  error: getError(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPassword: bindActionCreators(resetPassword, dispatch)
  };
}

export default withTranslation("common")(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ChangePasswordMailContainer)
  )
);
