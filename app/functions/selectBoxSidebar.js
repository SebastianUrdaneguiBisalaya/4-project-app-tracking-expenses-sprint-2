// export function selectBoxCategorySidebar() {
//   const btn = document.getElementById("categoryInput");
//   btn.addEventListener("focus", () => {
//     setTimeout(() => {
//       getCategoriesByIndexedDB();
//     }, 0);
//   });
// }

// async function getCategoriesByIndexedDB() {
//   if (!window.indexedDB) {
//     console.error(
//       "¡Mil disculpas! Tu navegador no soporta la API de IndexedDB."
//     );
//     return;
//   }
//   try {
//     const database = await openDatabase();
//     const transaction = database.transaction(["categories"], "readonly");
//     const objectStore = transaction.objectStore("categories");
//     const datalist = document.getElementById("categories");
//     datalist.innerHTML = "";
//     const cursorRequest = objectStore.openCursor();
//     cursorRequest.onsuccess = function (event) {
//       const cursor = event.target.result;
//       if (cursor) {
//         const option = document.createElement("option");
//         option.value = cursor.value.categoryName;
//         datalist.appendChild(option);
//         cursor.continue();
//       }
//     };
//     cursorRequest.onerror = function () {
//       console.error("Error al obtener los datos.");
//     };
//   } catch (error) {
//     console.error(error);
//   }
// }

// function openDatabase() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("categoriesDataBase", 1);
//     request.onupgradeneeded = function (event) {
//       const database = event.target.result;
//       if (!database.objectStoreNames.contains("categories")) {
//         const objectStore = database.createObjectStore("categories", {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//         objectStore.createIndex("categoryName", "categoryName", {
//           unique: true,
//         });
//         const defaultCategories = [
//           { categoryName: "Comida" },
//           { categoryName: "Transporte" },
//           { categoryName: "Útiles" },
//           { categoryName: "Entretenimiento" },
//           { categoryName: "Otros" },
//         ];
//         defaultCategories.forEach((category) => {
//           objectStore.add(category);
//         });
//       }
//     };
//     request.onsuccess = function (event) {
//       resolve(event.target.result);
//     };
//     request.onerror = function (event) {
//       reject("Error al abrir la base de datos: ");
//     };
//   });
// }

export function selectBoxCategorySidebar() {
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
