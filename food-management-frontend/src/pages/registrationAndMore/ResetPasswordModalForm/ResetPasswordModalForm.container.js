import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";
import { withTranslation } from "react-i18next";

import ResetPasswordModalForm from "./ResetPasswordModalForm.component";
import { sendResetPasswordMail } from "../../../actions/user.actions";
import { getFetchingUser, getError } from "../../../selectors/user.selectors";

export class ResetPasswordModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    error: string,
    fetching: bool,
    sendResetPasswordMail: func,
    t: func
  };

  handleSubmit = values => {
    return this.props
      .sendResetPasswordMail(values.login, values.email)
      .then(() => {
        this.props.dispatch(reset("resetPasswordModalForm"));
        toast.info(this.props.t("toastInfo.resetPasswordEmailSend"));
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
      <ResetPasswordModalForm
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
    sendResetPasswordMail: bindActionCreators(sendResetPasswordMail, dispatch)
  };
}

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModalFormContainer)
);
