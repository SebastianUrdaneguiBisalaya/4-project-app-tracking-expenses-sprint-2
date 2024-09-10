import toggleSideBar from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxSideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { addDataToLocalStorage } from "./functions/addData.js";
import { fetchAndRenderTable } from "../utils/getRenderExpenses.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleSideBar();
  selectBoxCategorySideBar();
  selectBoxCategoryMenu();
  addDataToLocalStorage();
  fetchAndRenderTable();
});
