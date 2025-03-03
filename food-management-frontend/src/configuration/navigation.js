import { userRoles } from "./roles";

const { admin, user, manager } = userRoles;

const navigationItems = [
  {
    text: "navBar.recipes.header", 
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
        canAccess: [user, manager]
      },
      {
        to: "/recipes/create",
        text: "navBar.recipes.createRecipe",
        canAccess: [user, manager]
      },
      {
        to: "/ingredients",
        text: "navBar.recipes.ingredients",
        canAccess: [manager]
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
