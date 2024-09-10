export function selectBoxCategorySideBar() {
  const categoryLocalStorage = JSON.parse(localStorage.getItem("categories"));
  if (!categoryLocalStorage) {
    const defaultCategories = [
      "Comida",
      "Transporte",
      "Útiles",
      "Entretenimiento",
      "Otros",
    ];
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  }
  const btn = document.getElementById("categoryInput");
  const dataList = document.getElementById("categories");
  btn.addEventListener("focus", function (event) {
    event.preventDefault();
    const categoryLocalStorage = JSON.parse(localStorage.getItem("categories"));
    dataList.innerHTML = "";
    categoryLocalStorage.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      dataList.appendChild(option);
    });
  });
}
