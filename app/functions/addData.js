import { Tracker } from "../classes/tracker.js";
import { Category } from "../classes/category.js";
import { updateAndRenderCharts } from "../../utils/getRenderCharts.js";

export function addDataToLocalStorage() {
  const tracker = new Tracker();
  const categoryManager = new Category();
  const btnAdd = document.getElementById("formData");
  btnAdd.addEventListener("submit", async function (event) {
    event.preventDefault();

    const date = document.getElementById("dateExpense").value.trim();
    const category = document.getElementById("categoryExpense").value.trim();
    const description = document
      .getElementById("descriptionExpense")
      .value.trim();
    const amount = parseFloat(
      document.getElementById("amountExpense").value.trim()
    );
    if (!date || !category || !description || isNaN(amount)) {
      alert("Por favor, completa todos los campos correctamente");
      return;
    }
    categoryManager.addCategory(category);
    tracker.addExpense(date, category, description, amount);
    updateAndRenderCharts();
    // document.getElementById("dateExpense").value = "";
    // document.getElementById("categoryExpense").value = "";
    // document.getElementById("descriptionExpense").value = "";
    // document.getElementById("amountExpense").value = "";
    btnAdd.reset();
  });
}
