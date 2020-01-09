import { userRoles } from "./roles";

import Login from "../pages/Login";
import Home from "../pages/Home";
import RegistrationAndMore from "../pages/registrationAndMore";

const { admin, user } = userRoles;
const routes = [
  { path: "/login", component: Login, public: true },
  { path: "/registrationAndMore", component: RegistrationAndMore, public: true },
  { path: "/", component: Home, canAccess: [user, admin] },
  {
    path: "/profile/settings",
    component: Login,
    public: true,
    canAccess: [user, admin]
  }
];

export default routes;
