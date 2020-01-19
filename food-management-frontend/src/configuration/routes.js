import { userRoles } from "./roles";

import Login from "../pages/Login";
import Home from "../pages/Home";
import RegistrationAndMore from "../pages/registrationAndMore";
import ComfirmedEmail from "../pages/ConfirmedEmail";
import ChangePasswordMail from "../pages/ChangePasswordMail";
import Profile from "../pages/Profile";
import HeadersUser from "../pages/Headers/User";
import Recipe from "../pages/Recipe";
import EditRecipe from "../pages/EditRecipe";
import CreateRecipe from "../pages/CreateRecipe";
import HeadersAuthor from "../pages/Headers/HeadersAuthor";
import Fridge from "../pages/Fridge";

const { admin, user } = userRoles;

const routes = [
  { path: "/login", component: Login, public: true },
  {
    path: "/registrationAndMore",
    component: RegistrationAndMore,
    public: true
  },
  {
    path: "/recipes/create",
    component: CreateRecipe,
    canAccess: [user, admin]
  },
  {
    path: "/recipes/my",
    component: HeadersAuthor,
    canAccess: [user, admin]
  },
  { path: "/", component: Home, canAccess: [user, admin] },
  {
    path: "/profile",
    component: Profile,
    canAccess: [user, admin]
  },
  {
    path: "/auth/registration",
    component: ComfirmedEmail,
    public: true
  },
  {
    path: "/auth/forgotPassword",
    component: ChangePasswordMail,
    public: true
  },
  {
    path: "/recipes/all",
    component: HeadersUser,
    canAccess: [user, admin]
  },
  {
    path: "/recipes/:recipeId",
    component: Recipe,
    canAccess: [user, admin]
  },
  {
    path: "/recipes/:recipeId/edit",
    component: EditRecipe,
    canAccess: [user, admin]
  },
  {
    path: "/myFridge",
    component: Fridge,
    canAccess: [user]
  }
];

export default routes;
