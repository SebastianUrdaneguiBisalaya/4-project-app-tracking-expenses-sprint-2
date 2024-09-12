import { Tracker } from "../app/classes/tracker.js";
import {
  createExpensesChart,
  createCategoryExpensesChart,
  updateChart,
  renderTotalExpenses,
} from "../app/functions/charts.js";

let expensesChartInstance;
let categoryChartInstance;

export async function fetchAndRenderCharts() {
  const tracker = new Tracker();
  let { dates, amounts_dates } = await tracker.getExpensesByDate();
  let { categories, amounts_categories } =
    await tracker.getExpensesByCategory();
  let totalExpenses = await tracker.getTotalExpenses().then();
  renderTotalExpenses(totalExpenses);
  expensesChartInstance = createExpensesChart(dates, amounts_dates);
  categoryChartInstance = createCategoryExpensesChart(
    categories,
    amounts_categories
  );
}

export async function updateAndRenderCharts() {
  const tracker = new Tracker();
  let { dates, amounts_dates } = await tracker.getExpensesByDate();
  let { categories, amounts_categories } =
    await tracker.getExpensesByCategory();
  let totalExpenses = await tracker.getTotalExpenses().then();
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
export { expensesChartInstance, categoryChartInstance };