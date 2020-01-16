import React from "react";
import { reduxForm } from "redux-form";
import { object, string } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import RecipeHeaderAdmin from "../../components/RecipeHeaderAdmin/RecipeHeaderAdmin";
import { userRoles } from "../../configuration/roles";

export const Recipe = props => {
  const { recipe, userRole } = props;

  return (
    <LayoutMain title="Recipe">
      <div>
        {/* <div className="center-align-elem"> //buttony, jak bd robic edcje statusu i przepisu 
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#editDetailsModal"
            text="Edit details"
          >
            Edit details
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
            Change password
          </button>
          <ChangePasswordModalForm />
        </div> */}
        {userRole === userRoles.admin ? (
          <RecipeHeaderAdmin
            active={recipe.active}
            waitingForAccept={recipe.waitingForAccept}
            toImprove={recipe.toImprove}
          />
        ) : (
          <></>
        )}

        <LabelWithData loading={false} label="Title:">
          {recipe.title}
        </LabelWithData>
        <LabelWithData loading={false} label="Preparation (mins):">
          {recipe.preparationMins}
        </LabelWithData>
        {recipe.user ? (
          <LabelWithData loading={false} label="Author:">
            {recipe.user.login}
          </LabelWithData>
        ) : (
          <LabelWithData loading={false} label="Author:">
            {recipe.userName}
          </LabelWithData>
        )}
        {/* <LabelWithData loading={false} label="Author:">
          {recipe.userName}
        </LabelWithData> */}
      </div>
    </LayoutMain>
  );
};

Recipe.propTypes = {
  recipe: object,
  userRole: string
};

export default reduxForm({
  form: "recipeform"
})(Recipe);
