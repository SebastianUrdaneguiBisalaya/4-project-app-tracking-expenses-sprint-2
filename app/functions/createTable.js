import { Tracker } from "../classes/tracker";

export function renderTable(data) {
  const container = document.getElementById("containerTable");
  container.innerHTML = "";
  // eslint-disable-next-line no-unused-vars
  const dataBase = data.map(({ id, ...rest }) => rest);
  const table = document.createElement("table");
  const tableHeader = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const keysHeader = new Set();
  dataBase.forEach((item) =>
    Object.keys(item).forEach((key) => keysHeader.add(key))
  );
  keysHeader.forEach((item) => {
    const th = document.createElement("th");
    th.textContent = String(item).toUpperCase();
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);
  dataBase.forEach((item, index) => {
    const row = document.createElement("tr");
    Object.values(item).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });

    const actionsTd = document.createElement("td");
    const actionsContainer = document.createElement("div");
    actionsContainer.style.display = "flex";
    actionsContainer.style.flexDirection = "row";
    actionsContainer.style.gap = "0.5rem";

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "🔄";
    updateBtn.setAttribute("data-index", index);
    updateBtn.classList.add("menu__button--update");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.setAttribute("data-index", index);
    deleteBtn.classList.add("menu__button--delete");

    actionsContainer.appendChild(updateBtn);
    actionsContainer.appendChild(deleteBtn);
    actionsTd.appendChild(actionsContainer);
    row.appendChild(actionsTd);
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  container.appendChild(table);

  document.querySelectorAll(".menu__button--update").forEach((button) => {
    button.addEventListener("click", function () {
      const index = event.target.getAttribute("data-index");
      handleUpdate(index, dataBase);
    });
  });

  document.querySelectorAll(".menu__button--delete").forEach((button) => {
    button.addEventListener("click", function () {
      const index = event.target.getAttribute("data-index");
      handleDelete(index, dataBase);
    });
  });
}

function handleUpdate(index, data) {
  const tracker = new Tracker();
  const dataMajor = tracker.loadExpensesFromStorage();
  console.log("Data Major", dataMajor);
  const selectedItem = data[index];
  document.getElementById("dateExpense").value = selectedItem.dia;
  document.getElementById("categoryExpense").value = selectedItem.categoria;
  document.getElementById("descriptionExpense").value =
    selectedItem.descripcion;
  document.getElementById("quantityExpense").value = selectedItem.cantidad;
  const addBtn = document.getElementById("btnAdd");
  addBtn.textContent = "Actualizar";
  addBtn.addEventListener("click", function () {
    saveChanges(index, dataMajor);
  });
}

function saveChanges(index, data) {
  const updateItem = {
    id: data[index],
    dia: document.getElementById("dateExpense").value,
    categoria: document.getElementById("categoryExpense").value,
    descripcion: document.getElementById("descriptionExpense").value,
    cantidad: document.getElementById("quantityExpense").value,
  };
  data[index] = updateItem;
  renderTable(data);
  const addBtn = document.getElementById("btnAdd");
  addBtn.textContent = "Agregar";
  addBtn.addEventListener("click", function () {});
}

function handleDelete(index, data) {
  data.splice(index, 1);
  renderTable(data);
}
