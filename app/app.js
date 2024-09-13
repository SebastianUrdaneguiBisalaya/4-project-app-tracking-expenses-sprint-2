import { toggleSideBar } from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxCategorySideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { addDataToLocalStorage } from "./functions/addData.js";
import { fetchAndRenderTable } from "../utils/getRenderExpenses.js";
import { fetchAndRenderCharts } from "../utils/getRenderCharts.js";
import { getFilteredData } from "./functions/filterByFields.js";
import { showTodayDate } from "../utils/showTodayDate.js";

const addEventListenerWithPassive = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function (type, listener, options) {
  let newOptions = options || {};
  if (type === "mousewheel" || type === "wheel") {
    if (typeof newOptions === "object") {
      newOptions.passive = true;
    } else {
      newOptions = { passive: true };
    }
  }

  addEventListenerWithPassive.call(this, type, listener, newOptions);
};

document.addEventListener("DOMContentLoaded", function () {
  toggleSideBar();
  selectBoxCategorySideBar();
  selectBoxCategoryMenu();
  addDataToLocalStorage();
  fetchAndRenderTable();
  fetchAndRenderCharts();
  getFilteredData();
  showTodayDate();
});
