import { Tracker } from "../app/classes/tracker.js";
import { renderTable } from "../app/functions/createTable.js";
// import { createBarChart } from "../app/functions/plots.js";

export async function fetchAndRenderTable() {
  const tracker = new Tracker();
  const data = await tracker.loadExpensesFromStorage();
  // const toPlotByCategory = await tracker
  //   .getExpensesByCategory()
  //   .then((data) => data);
  // const dataToPlotByCategory = [toPlotByCategory];
  renderTable(data);
  // createBarChart(dataToPlotByCategory);
}
