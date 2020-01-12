import { userRoles } from "./roles";

import Login from "../pages/Login";
import Home from "../pages/Home";
import RegistrationAndMore from "../pages/registrationAndMore";
import ComfirmedEmail from "../pages/ConfirmedEmail";
import ChangePasswordMail from "../pages/ChangePasswordMail";
import Profile from "../pages/Profile";

const { admin, user } = userRoles;

const routes = [
  { path: "/login", component: Login, public: true },
  {
    path: "/registrationAndMore",
    component: RegistrationAndMore,
    public: true
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
  }
];

export default routes;
