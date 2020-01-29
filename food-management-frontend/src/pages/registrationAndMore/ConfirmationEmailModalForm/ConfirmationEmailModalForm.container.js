import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";
import { withTranslation } from "react-i18next";

import ConfirmationEmailModalForm from "./ConfirmationEmailModalForm.component";
import { sendConfirmationMail } from "../../../actions/user.actions";
import { getFetchingUser, getError } from "../../../selectors/user.selectors";

export class ConfirmationEmailModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    error: string,
    fetching: bool,
    sendConfirmationMail: func,
    t: func
  };

  handleSubmit = values => {
    return this.props
      .sendConfirmationMail(values.login, values.email)
      .then(() => {
        this.props.dispatch(reset("confirmationEmailModalForm"));
        toast.info(this.props.t("toastInfo.confirmationEmailSend"));
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
      <ConfirmationEmailModalForm
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
    sendConfirmationMail: bindActionCreators(sendConfirmationMail, dispatch)
  };
}

export default withTranslation("common")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmationEmailModalFormContainer)
);
