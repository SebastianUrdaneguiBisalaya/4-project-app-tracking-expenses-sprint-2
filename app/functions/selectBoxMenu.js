export function selectBoxCategoryMenu() {
  const categoryLocalStorage = JSON.parse(localStorage.getItem("categories"));
  if (!categoryLocalStorage) {
    const defaultCategories = [
      "Food",
      "Transport",
      "Utils",
      "Entertainment",
      "Others",
    ];
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  }
  const btn = document.getElementById("categoryExpense");
  const dataList = document.getElementById("categoriesExpenses");
  btn.addEventListener("focus", function () {
    const categoryLocalStorage = JSON.parse(localStorage.getItem("categories"));
    dataList.innerHTML = "";
    categoryLocalStorage.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      dataList.appendChild(option);
    });
  });
}
