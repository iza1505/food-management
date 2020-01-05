import { userRoles } from "./roles";

const { admin, user} = userRoles;

const navigationItems = [
  {
    text: "Recipes",
    canAccess: [admin, user],
    subItems: [
      { to: "/recipes/all", text: "All recipes", canAccess: [admin, user] },
      { to: "/recipes/my", text: "My recipes", canAccess: [admin, user] },
      { to: "/recipes/create", text: "My recipes", canAccess: [admin, user] }
    ]
  },
  {
    text: "Fridge",
    canAccess: [user],
    subItems: [
      { to: "/fridge/my", text: "My fridge", canAccess: [user] },
      { to: "/fridge/edit", text: "Edit fridge", canAccess: [user] }
    ]
  },
  {
    text: "Users",
    canAccess: [admin],
    subItems: [
      { to: "/users", text: "All users", canAccess: [admin] },
      { to: "/users/add", text: "Add user", canAccess: [admin] }
    ]
  }
];

export default navigationItems;
