import toggleSideBar from "./functions/hamburguerIcon.js";
import { selectBoxCategorySideBar } from "./functions/selectBoxSideBar.js";
import { selectBoxCategoryMenu } from "./functions/selectBoxMenu.js";
import { addDataToLocalStorage } from "./functions/addData.js";
import { fetchAndRenderTable } from "../utils/getRenderExpenses.js";

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
  createBarChart();
  getFilteredData();
});
