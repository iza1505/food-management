import React from "react";
import { reduxForm } from "redux-form";
import { func, object, string } from "prop-types";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import { userRoles } from "../../configuration/roles";
import { renderBooelan } from "../../configuration/helpers";
import UpdateRecipeStatusModalForm from "./UpdateRecipeStatusModalForm";

export const Recipe = props => {
  const { recipe, userRole, userLogin, handleEditRecipe, t } = props;
  return (
    <LayoutMain title="Przepis">
      <div>
        <div className="center-align-elem">
          {recipe &&
          userRole === userRoles.user &&
          recipe.userName === userLogin ? (
            <button
              className="btn btn-success "
              text="Edit recipe"
              onClick={() => handleEditRecipe()}
            >
              {t("button.editRecipe")}
            </button>
          ) : (
            <></>
          )}
          {recipe && userRole === userRoles.manager ? (
            recipe.user && recipe.user.login === userLogin ? (
              <button
                className="btn btn-success "
                text="Edit recipe"
                onClick={() => handleEditRecipe()}
              >
                Edit recipe
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success "
                  data-toggle="modal"
                  data-target="#updateRecipeStatusModalForm"
                  text="Edit recipe"
                >
                  {t("button.changeRecipeStatus")}
                </button>
                <UpdateRecipeStatusModalForm />
              </>
            )
          ) : (
            <></>
          )}
        </div>
        {recipe &&
        (userRole === userRoles.admin || userRole === userRoles.manager) ? (
          <>
            <LabelWithData
              loading={false}
              label={t("label.active")}
              color="blueviolet"
            >
              {t(renderBooelan(recipe.active))}
            </LabelWithData>
            <LabelWithData
              loading={false}
              label={t("label.waitingForAccept")}
              color="blueviolet"
            >
              {t(renderBooelan(recipe.waitingForAccept))}
            </LabelWithData>
            <LabelWithData
              loading={false}
              label={t("label.toImprove")}
              color="blueviolet"
            >
              {recipe.toImprove ? recipe.toImprove : "-"}
            </LabelWithData>
          </>
        ) : (
          <></>
        )}

        <LabelWithData loading={false} label={t("label.title")}>
          {recipe ? <>{recipe.title}</> : <></>}
        </LabelWithData>

        <LabelWithData loading={false} label={t("label.preparationTime")}>
          {recipe ? <>{recipe.preparationMins}</> : <></>}
        </LabelWithData>

        {recipe && recipe.user ? (
          <LabelWithData loading={false} label={t("label.author")}>
            {recipe.user.login}
          </LabelWithData>
        ) : (
          <LabelWithData loading={false} label={t("label.author")}>
            {recipe ? <>{recipe.userName}</> : <></>}
          </LabelWithData>
        )}

        {recipe &&
        (userRole === userRoles.admin || userRole === userRoles.manager) ? (
          <>
            <LabelWithData loading={false} label={t("label.ingredients")}>
              {recipe.ingredients ? (
                recipe.ingredients.map((elem, index) => (
                  <div style={{ color: "blue" }} key={index}>
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
            <LabelWithData loading={false} label={t("label.ingredients")}>
              {recipe && recipe.ingredients ? (
                recipe.ingredients.map((elem, index) =>
                  elem.amount <= elem.hasGot ? (
                    <div style={{ color: "green" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} /{" "}
                      {t("label.youHave")} {elem.hasGot}{" "}
                      {elem.ingredient.measure.measureName}
                    </div>
                  ) : elem.hasGot === 0 ? (
                    <div style={{ color: "red" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} /{" "}
                      {t("label.youHave")} {elem.hasGot}{" "}
                      {elem.ingredient.measure.measureName}
                    </div>
                  ) : (
                    <div style={{ color: "orange" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} /{" "}
                      {t("label.youHave")} {elem.hasGot}{" "}
                      {elem.ingredient.measure.measureName}{" "}
                      {"(" +
                        ((elem.hasGot / elem.amount) * 100).toFixed(0) +
                        "%)"}
                    </div>
                  )
                )
              ) : (
                <></>
              )}
            </LabelWithData>
          </>
        )}
        <LabelWithData loading={false} label={t("label.description")}>
          {recipe ? <>{recipe.description}</> : <></>}
        </LabelWithData>
      </div>
    </LayoutMain>
  );
};

Recipe.propTypes = {
  handleEditRecipe: func,
  recipe: object,
  userLogin: string,
  userRole: string
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "recipeform"
  })
)(Recipe);
