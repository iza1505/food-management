const elementsOnPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 }
];

const ascendingSortOptions = [
  { label: "Ascending", value: true },
  { label: "Descending", value: false }
];

const sortByOptionsUser = [
  { label: "Title", value: "title" },
  { label: "Missing ingredient amout", value: "missingIngredientsAmount" },
  {
    label: "Cookable % (from possessed ingredients)",
    value: "percentageToCook"
  }
];

const sortByOptionsAdmin = [
  { label: "Title", value: "title" },
  { label: "User login", value: "userLogin" },
  { label: "Active", value: "active" },
  { label: "Waiting for accept", value: "waitingForAccept" }
];

const sortByOptionsAuthor = [
  { label: "Title", value: "title" },
  { label: "Active", value: "active" },
  { label: "Waiting for accept", value: "waitingForAccept" }
];

const sortByOptionsIngredient = [
  { label: "Name", value: "ingredientName" },
  { label: "Measure", value: "measure.measureName" },
  { label: "Active", value: "active" }
];

const possibleMissingIngredientsAmountOptions = [
  { label: "Any amount", value: -1 },
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
  sortByOptionsIngredient
};
