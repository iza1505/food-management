import { userRoles } from "./roles";

const { admin, user } = userRoles;

const navigationItems = [
  {
    text: "Przepisy",
    canAccess: [admin, user],
    subItems: [
      {
        to: "/recipes/all",
        text: "Wszystkie przepisy",
        canAccess: [admin, user]
      },
      { to: "/recipes/my", text: "Moje przepisy", canAccess: [admin, user] },
      {
        to: "/recipes/create",
        text: "Utwórz przepis",
        canAccess: [admin, user]
      },
      { to: "/ingredients", text: "Produkty", canAccess: [admin] }
    ]
  },
  {
    text: "Lodówka",
    canAccess: [user],
    subItems: [{ to: "/myFridge", text: "Moja lodówka", canAccess: [user] }]
  },
  {
    text: "Użytkownicy",
    canAccess: [admin],
    subItems: [
      { to: "/users", text: "Wszyscy użytkownicy", canAccess: [admin] }
    ]
  }
];

export default navigationItems;
