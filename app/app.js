import toggleSideBar from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxSideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { addDataToLocalStorage } from "./functions/addData.js";
import { fetchAndRenderTable } from "../utils/getRenderExpenses.js";
import { createBarChart } from "./functions/plots.js";
import { getFilteredData } from "./functions/filterByFields.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleSideBar();
  selectBoxCategorySideBar();
  selectBoxCategoryMenu();
  addDataToLocalStorage();
  fetchAndRenderTable();
  createBarChart();
  getFilteredData();
});
