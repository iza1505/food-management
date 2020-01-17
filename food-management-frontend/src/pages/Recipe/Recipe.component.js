import React from "react";
import { reduxForm } from "redux-form";
import { object, string } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import { userRoles } from "../../configuration/roles";
import { renderBooelan } from "../../configuration/helpers";
import UpdateRecipeStatusModal from "./UpdateRecipeStatusModal";
//import EditRecipeModalForm from "./EditRecipeModalForm";

export const Recipe = props => {
  const { recipe, userRole, userLogin } = props;
  return (
    <LayoutMain title="Recipe">
      <div>
        <div className="center-align-elem">
          {userRole === userRoles.user && recipe.userName === userLogin ? (
            <button
              className="btn btn-success "
              data-toggle="modal"
              data-target="#editRecipeModal"
              text="Edit recipe"
            >
              Edit recipe
            </button>
          ) : (
            <></>
          )}
          {userRole === userRoles.admin ? (
            recipe.user && recipe.user.login === userLogin ? (
              <button
                className="btn btn-success "
                data-toggle="modal"
                data-target="#editRecipeModal"
                text="Edit recipe"
              >
                Edit recipe
              </button>
            ) : (
              <button
                className="btn btn-success "
                data-toggle="modal"
                data-target="#updateRecipeStatusModal"
                text="Edit recipe"
              >
                Update recipe status
              </button>
            )
          ) : (
            <></>
          )}
        </div>
        {userRole === userRoles.admin ? (
          <>
            <LabelWithData loading={false} label="Active:" color="blueviolet">
              {renderBooelan(recipe.active)}
            </LabelWithData>
            <LabelWithData
              loading={false}
              label="Waiting for accept:"
              color="blueviolet"
            >
              {renderBooelan(recipe.waitingForAccept)}
            </LabelWithData>
            <LabelWithData
              loading={false}
              label="To improve:"
              color="blueviolet"
            >
              {recipe.toImprove ? recipe.toImprove : "-"}
            </LabelWithData>
          </>
        ) : (
          <></>
        )}
        <UpdateRecipeStatusModal />
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

        {userRole === userRoles.admin ? (
          <>
            <LabelWithData loading={false} label="Ingredients:">
              {recipe.ingredients ? (
                recipe.ingredients.map(elem => (
                  <div style={{ color: "blue" }} key={elem.id}>
                    {elem.ingredient.ingredientName}: {elem.amount}{" "}
                    {elem.ingredient.measure.measureName}
                  </div>
                ))
              ) : (
                <></>
              )}
            </LabelWithData>
          </>
        ) : (
          <>
            {" "}
            <LabelWithData loading={false} label="Ingredients:">
              {recipe.ingredients ? (
                recipe.ingredients.map(elem =>
                  elem.amount <= elem.hasGot ? (
                    <div style={{ color: "blue" }}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} / You have:{" "}
                      {elem.hasGot} {elem.ingredient.measure.measureName}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} / You have:{" "}
                      {elem.hasGot} {elem.ingredient.measure.measureName}
                    </div>
                  )
                )
              ) : (
                <></>
              )}
            </LabelWithData>
          </>
        )}

        <LabelWithData loading={false} label="Description:">
          {recipe.description}
        </LabelWithData>
      </div>
    </LayoutMain>
  );
};

Recipe.propTypes = {
  recipe: object,
  userLogin: string,
  userRole: string
};

export default reduxForm({
  form: "recipeform"
})(Recipe);
