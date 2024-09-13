export function showTodayDate() {
  const inputDate = document.getElementById("dateExpense");
  const today = new Date().toISOString().split("T")[0];
  inputDate.value = today;
}
