import toggleSideBar from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxSideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { renderTable } from "./functions/createTable.js";
import { addDataToLocalStorage } from "./functions/addData.js";
import { Tracker } from "./classes/tracker.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleSideBar();
  selectBoxCategorySideBar();
  selectBoxCategoryMenu();
  addDataToLocalStorage();
  const tracker = new Tracker();
  async function fetchAndRenderTable() {
    const data = await tracker.loadExpensesFromStorage();
    renderTable(data);
  }
  fetchAndRenderTable();
});
