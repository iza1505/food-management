import React from "react";
import { reduxForm } from "redux-form";
import { string, number } from "prop-types";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import ChangePasswordModalForm from "./ChangePasswordModalForm";
import EditDetailsModalForm from "./EditDetailsModalForm";

export const Profile = props => {
  const { id, login, email, t } = props;

  return (
    <LayoutMain title={t("pageTitle.profile")}>
      <div>
        <div className="center-align-elem">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#editDetailsModal"
            text="Edit details"
          >
            {t("button.editUser")}
          </button>
          <EditDetailsModalForm />

          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#changePasswordModal"
            text="Change password"
            style={{
              marginLeft: "5px"
            }}
          >
            {t("button.changePassword")}
          </button>
          <ChangePasswordModalForm />
        </div>

        <LabelWithData loading={false} label="ID:">
          {id}
        </LabelWithData>
        <LabelWithData loading={false} label={t("label.login")}>
          {login}
        </LabelWithData>
        <LabelWithData loading={false} label="Email:">
          {email}
        </LabelWithData>
      </div>
    </LayoutMain>
  );
};

Profile.propTypes = {
  email: string,
  id: number,
  login: string
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "profileform"
  })
)(Profile);
