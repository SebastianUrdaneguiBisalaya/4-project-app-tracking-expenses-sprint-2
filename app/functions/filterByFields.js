import { updateChart, renderTotalExpenses } from "./Charts.js";
import {
  expensesChartInstance,
  categoryChartInstance,
} from "../../utils/getRenderCharts.js";
import { Tracker } from "../classes/tracker.js";

export function getFilteredData() {
  const newTracker = new Tracker();
  const btnFilter = document.getElementById("filterForm");

  btnFilter.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = document.getElementById("categoryInput").value.trim();
    const dateStart = document.getElementById("dateStart").value.trim();
    const dateEnd = document.getElementById("dateDone").value.trim();
    if (!category && !dateStart && !dateEnd) {
      alert("Por favor, ingrese datos en los campos");
      return;
    }
    if (dateStart > dateEnd) {
      alert("La fecha inicial no puede ser mayor a la final");
      return;
    }
    if (!dateStart && dateEnd) {
      alert("Ingrese una fecha inicial");
      return;
    }
    if (!dateEnd && dateStart) {
      alert("Ingrese una fecha final");
      return;
    }

    newTracker
      .getExpensesByFilter({
        category,
        dateStart,
        dateEnd,
      })
      .then(
        ({
          dates,
          amounts_dates,
          categories,
          amounts_categories,
          totalExpenses,
        }) => {
          renderTotalExpenses(totalExpenses);
          if (expensesChartInstance && categoryChartInstance) {
            updateChart(expensesChartInstance, dates, amounts_dates);
            updateChart(categoryChartInstance, categories, amounts_categories);
          } else {
            console.error(
              "Charts are not initialized. Run fetchAndRenderCharts first."
            );
          }
        }
      )
      .catch((error) => {
        console.error("Error al obtener los datos filtrados: ", error);
      });
  });
}
