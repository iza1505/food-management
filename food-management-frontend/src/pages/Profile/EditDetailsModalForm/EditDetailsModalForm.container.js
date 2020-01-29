import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string } from "prop-types";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

import EditDetailsModalForm from "./EditDetailsModalForm.component";
import { updateDetails } from "../../../actions/user.actions";
import { getVersion, getEmail } from "../../../selectors/user.selectors";

export class EditDetailsModalFormContainer extends Component {
  static propTypes = {
    email: string,
    t: func,
    updateDetails: func,
    version: number
  };

  handleSubmit = values => {
    return this.props
      .updateDetails(values.email, this.props.version)
      .then(() => {
        toast.info(this.props.t("toastInfo.dataHasBeenChanged"));
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.incorrectData"));
        }
      });
  };

  render() {
    return (
      <EditDetailsModalForm
        onSubmit={this.handleSubmit}
        email={this.props.email}
      />
    );
  }
}

const mapStateToProps = state => ({
  version: getVersion(state),
  email: getEmail(state)
});

const mapDispatchToProps = {
  updateDetails
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProps)(EditDetailsModalFormContainer)
);
