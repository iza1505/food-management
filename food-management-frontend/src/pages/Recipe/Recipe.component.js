import React from "react";
import { reduxForm } from "redux-form";
import { func, object, string } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import LabelWithData from "../../components/LabelWithData/LabelWithData";
import { userRoles } from "../../configuration/roles";
import { renderBooelan } from "../../configuration/helpers";
import UpdateRecipeStatusModalForm from "./UpdateRecipeStatusModalForm";

export const Recipe = props => {
  const { recipe, userRole, userLogin, handleEditRecipe } = props;
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
              Edytuj przepis
            </button>
          ) : (
            <></>
          )}
          {recipe && userRole === userRoles.admin ? (
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
                  Update recipe status
                </button>
                <UpdateRecipeStatusModalForm />
              </>
            )
          ) : (
            <></>
          )}
        </div>
        {recipe && userRole === userRoles.admin ? (
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

        <LabelWithData loading={false} label="Tytuł:">
          {recipe ? <>{recipe.title}</> : <></>}
        </LabelWithData>

        <LabelWithData loading={false} label="Czas przygotowania (min):">
          {recipe ? <>{recipe.preparationMins}</> : <></>}
        </LabelWithData>

        {recipe && recipe.user ? (
          <LabelWithData loading={false} label="Autor:">
            {recipe.user.login}
          </LabelWithData>
        ) : (
          <LabelWithData loading={false} label="Autor:">
            {recipe ? <>{recipe.userName}</> : <></>}
          </LabelWithData>
        )}

        {recipe && userRole === userRoles.admin ? (
          <>
            <LabelWithData loading={false} label="Składniki:">
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
            <LabelWithData loading={false} label="Składniki:">
              {recipe && recipe.ingredients ? (
                recipe.ingredients.map((elem, index) =>
                  elem.amount <= elem.hasGot ? (
                    <div style={{ color: "green" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} / Posiadasz:{" "}
                      {elem.hasGot} {elem.ingredient.measure.measureName}
                    </div>
                  ) : elem.hasGot === 0 ? (
                    <div style={{ color: "red" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} / Posiadasz:{" "}
                      {elem.hasGot} {elem.ingredient.measure.measureName}
                    </div>
                  ) : (
                    <div style={{ color: "orange" }} key={index}>
                      {elem.ingredient.ingredientName}: {elem.amount}{" "}
                      {elem.ingredient.measure.measureName} / Posiadasz:{" "}
                      {elem.hasGot} {elem.ingredient.measure.measureName}{" "}
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
        <LabelWithData loading={false} label="Opis:">
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

export default reduxForm({
  form: "recipeform"
})(Recipe);
