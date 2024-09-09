import { Expenses } from "./expenses.js";
import { sumByCategory } from "../../utils/sumByCategory";

export class Tracker {
  constructor() {
    this.databaseName = "ExpensesTracker";
    this.databaseVersion = 1;
    this.expenses = [];
    this.initIndexedDB();
  }
  initIndexedDB() {
    const request = indexedDB.open(this.databaseName, this.databaseVersion);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("expenses")) {
        db.createObjectStore("expenses", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.loadExpensesFromStorage();
    };
    request.onerror = (event) => {
      console.error("Error al abrir la base de datos: ", event);
      return;
    };
  }

  addExpense(amount, description, date, category) {
    const expense = new Expenses(amount, description, date, category);
    const transaction = this.db.transaction(["expenses"], "readwrite");
    const store = transaction.objectStore("expenses");
    store.add({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.date,
    });
    transaction.oncomplete = () => {
      this.loadExpensesFromStorage();
    };
    transaction.onerror = (event) => {
      console.error("Error al agregar", event);
      return;
    };
  }

  loadExpensesFromStorage() {
    const transaction = this.db.transaction(["expense"], "readonly");
    const store = transaction.objectStore("expenses");
    const request = store.getAll();
    request.onsuccess = (event) => {
      this.expenses = event.target.result;
    };
    request.onerror = (event) => {
      console.error("Error al cargar los datos ", event);
    };
  }

  getTotalExpenses() {
    return this.expenses.reduce((acc, val) => acc + val.amount, 0);
  }
  getExpensesByCategory() {
    return sumByCategory(this.expenses);
  }
}
