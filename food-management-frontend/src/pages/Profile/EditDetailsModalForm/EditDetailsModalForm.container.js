import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string } from "prop-types";
import { toast } from "react-toastify";

import EditDetailsModalForm from "./EditDetailsModalForm.component";
import { updateDetails } from "../../../actions/user.actions";
import { getVersion, getEmail } from "../../../selectors/user.selectors";

export class EditDetailsModalFormContainer extends Component {
  static propTypes = {
    email: string,
    updateDetails: func,
    version: number
  };

  handleSubmit = values => {
    return this.props
      .updateDetails(values.email, this.props.version)
      .then(() => {
        toast.info("Details have been changed.");
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDetailsModalFormContainer);
