import { Tracker } from "../app/classes/tracker.js";

export async function fetchData() {
  const tracker = new Tracker();
  const data = await tracker.loadExpensesFromStorage();
  return data;
}
