const elementsOnPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 }
];

const ascendingSortOptions = [
  { label: "select.ascending", value: true },
  { label: "select.descending", value: false }
];

const sortByOptionsUser = [
  { label: "select.title", value: "title" },
  { label: "select.missingIngrAmout", value: "missingIngredientsAmount" },
  {
    label: "select.cookable",
    value: "percentageToCook"
  }
];

const sortByOptionsAdmin = [
  { label: "select.title", value: "title" },
  { label: "select.author", value: "userLogin" },
  { label: "select.active", value: "active" },
  { label: "select.waitingForAccept", value: "waitingForAccept" }
];

const sortByOptionsAuthor = [
  { label: "select.title", value: "title" },
  { label: "select.active", value: "active" },
  { label: "select.waitingForAccept", value: "waitingForAccept" }
];

const userSortByOptionsAdmin = [
  { label: "select.login", value: "login" },
  { label: "select.role", value: "role" },
  { label: "select.active", value: "active" }
];

const sortByOptionsIngredient = [
  { label: "select.name", value: "ingredientName" },
  { label: "select.measureSort", value: "measure.measureName" },
  { label: "select.active", value: "active" }
];

const roleOptionsRegistration = [
  { label: "select.role", value: null },
  { label: "select.admin", value: "ADMINISTRATOR" },
  { label: "select.user", value: "USER" }
];

const possibleMissingIngredientsAmountOptions = [
  { label: "select.anyQuantity", value: -1 },
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 }
];

export {
  elementsOnPageOptions,
  possibleMissingIngredientsAmountOptions,
  sortByOptionsUser,
  ascendingSortOptions,
  sortByOptionsAdmin,
  sortByOptionsAuthor,
  sortByOptionsIngredient,
  roleOptionsRegistration,
  userSortByOptionsAdmin
};
