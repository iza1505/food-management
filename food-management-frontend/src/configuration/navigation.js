import { userRoles } from "./roles";

const { admin, user} = userRoles;

const navigationItems = [
  {
    text: "Recipes",
    canAccess: [admin, user],
    subItems: [
      { to: "/recipes/all", text: "All recipes", canAccess: [admin, user] },
      { to: "/recipes/my", text: "My recipes", canAccess: [admin, user] },
      { to: "/recipes/create", text: "Create recipes", canAccess: [admin, user] },
      { to: "/recipesProducts", text: "Ingredients", canAccess: [admin] }
    ]
  },
  {
    text: "Fridge",
    canAccess: [user],
    subItems: [
      { to: "/fridge/my", text: "My fridge", canAccess: [user] },
      { to: "/products", text: "All avaliable products", canAccess: [user] }
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
