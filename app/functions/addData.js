import { Tracker } from "../classes/tracker.js";
import { Category } from "../classes/category.js";

const tracker = new Tracker();
const categoryManager = new Category();

export function addDataToLocalStorage() {
  const btnAdd = document.getElementById("btnAdd");
  if (btnAdd.textContent.trim() === "Agregar") {
    btnAdd.addEventListener("click", function (event) {
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
      tracker.addExpense(amount, description, date, category);
      document.getElementById("dateExpense").value = "";
      document.getElementById("categoryExpense").value = "";
      document.getElementById("descriptionExpense").value = "";
      document.getElementById("amountExpense").value = "";
    });
  }
}
