
import { userRoles } from "./roles";

import Login from "../pages/Login";

const { admin, user} = userRoles;

const routes = [
  { path: "/login", component: Login, public: true }
];

export default routes;
