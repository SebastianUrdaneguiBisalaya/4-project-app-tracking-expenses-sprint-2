import toggleSideBar from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxSideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { renderTable } from "./functions/createTable.js";

const data = [
  {
    id: "1",
    date: "2024-07-08",
    category: "Transporte",
    description: "Pasaje para la universidad",
    amount: 5,
  },
  {
    id: "2",
    date: "2024-07-08",
    category: "Entretenimiento",
    description: "Ir al cine",
    amount: 28,
  },
  {
    id: "3",
    date: "2024-07-08",
    category: "Otros",
    description: "Comprar snacks para las películas",
    amount: 15,
  },
  {
    id: "4",
    date: "2024-07-08",
    category: "Comida",
    description: "Almuerzo diario",
    amount: 30,
  },
  {
    id: "1",
    date: "2024-07-08",
    category: "Transporte",
    description: "Pasaje para la universidad",
    amount: 5,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  toggleSideBar();
  selectBoxCategorySideBar();
  selectBoxCategoryMenu();
  renderTable(data);
});
