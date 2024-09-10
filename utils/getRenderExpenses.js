import { Tracker } from "../app/classes/tracker.js";
import { renderTable } from "../app/functions/createTable.js";

export async function fetchAndRenderTable() {
  const tracker = new Tracker();
  const data = await tracker.loadExpensesFromStorage();
  renderTable(data);
}
