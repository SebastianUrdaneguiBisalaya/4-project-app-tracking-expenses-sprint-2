import { Tracker } from "../classes/tracker.js";
import { fetchData } from "../../utils/getExpenses.js";
import { updateAndRenderCharts } from "../../utils/getRenderCharts.js";

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
    actionsContainer.style.justifyContent = "space-between";

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
      handleUpdate(index);
    });
  });

  document.querySelectorAll(".menu__button--delete").forEach((button) => {
    button.addEventListener("click", function () {
      const index = event.target.getAttribute("data-index");
      handleDelete(index);
    });
  });
}

async function handleUpdate(index) {
  const dataMajor = await fetchData();
  const selectedItem = dataMajor[index];
  document.getElementById("dateExpense").value = selectedItem.date;
  document.getElementById("categoryExpense").value = selectedItem.category;
  document.getElementById("descriptionExpense").value =
    selectedItem.description;
  document.getElementById("amountExpense").value = selectedItem.amount;
  const addBtn = document.getElementById("btnAdd");
  addBtn.textContent = "Update";
  const updateHandler = async function (e) {
    e.preventDefault();
    if (addBtn.textContent.trim() === "Update") {
      await saveChanges(index);
      addBtn.removeEventListener("click", updateHandler);
      document.getElementById("dateExpense").value = "";
      document.getElementById("categoryExpense").value = "";
      document.getElementById("descriptionExpense").value = "";
      document.getElementById("amountExpense").value = "";
      addBtn.textContent = "Add";
    }
  };
  addBtn.addEventListener("click", updateHandler);
}

async function saveChanges(index) {
  const dataMajor = await fetchData();
  const updateItem = {
    id: dataMajor[index].id,
    date: document.getElementById("dateExpense").value.trim(),
    category: document.getElementById("categoryExpense").value.trim(),
    description: document.getElementById("descriptionExpense").value.trim(),
    amount: document.getElementById("amountExpense").value.trim(),
  };
  dataMajor[index] = updateItem;
  const tracker = new Tracker();
  const id = updateItem.id;
  await tracker.updateExpense(updateItem).then(() => {
    dataMajor[index] = { ...updateItem, id };
    renderTable(dataMajor);
  });
  await updateAndRenderCharts();
}

async function handleDelete(index) {
  const dataToDelete = await fetchData();
  const tracker = new Tracker();
  const id = dataToDelete[index].id;
  await tracker.deleteExpense(id).then(() => {
    dataToDelete.splice(index, 1);
    renderTable(dataToDelete);
  });
  await updateAndRenderCharts();
}

