export function selectBoxCategoryMenu() {
  if (!window.indexedDB) {
    console.error(
      "¡Mil disculpas! Tu navegador no soporta la API de IndexedDB."
    );
    return;
  }
  const databaseName = "categoriesDataBase";
  const request = indexedDB.open(databaseName, 1);

  let database;
  request.onerror = function (event) {
    console.error("Error al abrir la base de datos: ", event);
  };
  request.onsuccess = function (event) {
    database = event.target.result;
    uploadCategories();
  };
  request.onupgradeneeded = function (event) {
    database = event.target.result;
    const objectStore = database.createObjectStore("categories", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("categoryName", "categoryName", { unique: true });
  };
  function addCategories(categoryValue) {
    const transaction = database.transaction(["categories"], "readwrite");
    const objectStore = transaction.objectStore("categories");
    const newCategory = { categoryName: categoryValue };
    const addRequest = objectStore.add(newCategory);
    addRequest.onerror = function () {
      alert("La categoría ya existe.");
    };
    addRequest.onsuccess = function () {
      uploadCategories();
    };
  }
  function uploadCategories() {
    const dataList = document.getElementById("categories");
    dataList.innerHTML = "";
    const transaction = database.transaction(["categories"], "readonly");
    const objectStore = transaction.objectStore("categories");
    objectStore.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const option = document.createElement("option");
        option.value = cursor.value.categoryName;
        dataList.appendChild(option);
        cursor.continue();
      }
    };
  }
  document
    .getElementById("addCategoryBtn")
    .addEventListener("click", function () {
      const categoryInput = document.getElementById("categoryInput");
      const categoryValue = categoryInput.value.trim();
      if (categoryValue) {
        addCategories(categoryValue);
        categoryInput.value = "";
      }
    });
}
