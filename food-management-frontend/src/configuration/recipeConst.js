const elementsOnPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 }
];

const ascendingSortOptions = [
  { label: "Rosnąco", value: true },
  { label: "Malejąco", value: false }
];

const sortByOptionsUser = [
  { label: "Tytuł", value: "title" },
  { label: "Ilość brakujących składników", value: "missingIngredientsAmount" },
  {
    label: "Możliwy % do ugotowania (z posiadanych produktów)",
    value: "percentageToCook"
  }
];

const sortByOptionsAdmin = [
  { label: "Tytuł", value: "title" },
  { label: "Login autora", value: "userLogin" },
  { label: "Aktywny", value: "active" },
  { label: "Oczekuje na sprawdzenie", value: "waitingForAccept" }
];

const sortByOptionsAuthor = [
  { label: "Tytuł", value: "title" },
  { label: "Aktywny", value: "active" },
  { label: "Oczekuje na sprawdzenie", value: "waitingForAccept" }
];

const userSortByOptionsAdmin = [
  { label: "Login", value: "login" },
  { label: "Rola", value: "role" },
  { label: "Aktywny", value: "active" }
];

const sortByOptionsIngredient = [
  { label: "Nazwa", value: "ingredientName" },
  { label: "Miara", value: "measure.measureName" },
  { label: "Aktywny", value: "active" }
];

const roleOptionsRegistration = [
  { label: "Wybierz rolę...", value: "" },
  { label: "Administrator", value: "ADMINISTRATOR" },
  { label: "Użytkownik", value: "USER" }
];

const possibleMissingIngredientsAmountOptions = [
  { label: "Dowolna ilość", value: -1 },
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
