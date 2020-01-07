//import { userRoles } from "./roles";

import Login from "../pages/Login";

//const { admin, user} = userRoles; -> jak beda prywatne routes
const routes = [
  { path: "/login", component: Login, public: true },
  { path: "/profile/settings", component: Login, public: true }
];

export default routes;
