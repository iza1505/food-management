import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func } from "prop-types";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";

import ConfirmationEmailModalForm from "./ConfirmationEmailModalForm.component";
import { sendConfirmationMail } from "../../../actions/user.actions";
import { getFetchingUser } from "../../../selectors/user.selectors";

export class ConfirmationEmailModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    fetching: bool,
    sendConfirmationMail: func
  };

  handleSubmit = values => {
    return this.props
      .sendConfirmationMail(values.login, values.email)
      .then(() => {
        this.props.dispatch(reset("confirmationEmailModalForm"));
        toast.info("Email aktywujący konto został wysłany.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem.");
        } else {
          toast.error("Niepoprawne dane.");
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
  fetching: getFetchingUser(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendConfirmationMail: bindActionCreators(sendConfirmationMail, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationEmailModalFormContainer);
