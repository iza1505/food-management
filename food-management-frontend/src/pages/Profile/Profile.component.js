import React from "react";
import { reduxForm } from "redux-form";
import { string, number } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import ChangePasswordModalForm from "./ChangePasswordModalForm";
import EditDetailsModalForm from "./EditDetailsModalForm";

export const Profile = props => {
  const { id, login, email } = props;

  return (
    <LayoutMain title="Profil">
      <div>
        <div className="center-align-elem">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#editDetailsModal"
            text="Edit details"
          >
            Edytuj dane
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
            Zmień hasło
          </button>
          <ChangePasswordModalForm />
        </div>

        <LabelWithData loading={false} label="ID:">
          {id}
        </LabelWithData>
        <LabelWithData loading={false} label="Login:">
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

export default reduxForm({
  form: "profileform"
})(Profile);
