import { userRoles } from "./roles";

const { admin, user, manager } = userRoles;

const navigationItems = [
  {
    text: "navBar.recipes.header", //"Przepisy",
    canAccess: [admin, user, manager],
    subItems: [
      {
        to: "/recipes/all",
        text: "navBar.recipes.allRecipes",
        canAccess: [admin, user, manager]
      },
      {
        to: "/recipes/my",
        text: "navBar.recipes.myRecipes",
        canAccess: [admin, user, manager]
      },
      {
        to: "/recipes/create",
        text: "navBar.recipes.createRecipe",
        canAccess: [admin, user, manager]
      },
      {
        to: "/ingredients",
        text: "navBar.recipes.ingredients",
        canAccess: [admin, manager]
      }
    ]
  },
  {
    text: "navBar.fridge.header",
    canAccess: [user],
    subItems: [
      { to: "/myFridge", text: "navBar.fridge.myFridge", canAccess: [user] }
    ]
  },
  {
    text: "navBar.users.header",
    canAccess: [admin],
    subItems: [
      {
        to: "/users",
        text: "navBar.users.allUsers",
        canAccess: [admin, manager]
      }
    ]
  }
];

export default navigationItems;
