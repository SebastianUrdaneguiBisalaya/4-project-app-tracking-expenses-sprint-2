import { Expenses } from "./expenses.js";
import { Category } from "./category.js";
import { sumByCategory } from "../../utils/sumByCategory.js";
import { renderTable } from "../functions/createTable.js";

export class Tracker {
  constructor() {
    this.databaseName = "ExpensesTracker";
    this.databaseVersion = 1;
    this.expenses = [];
    this.db = null;
    this.dbReady = this.initIndexedDB();
  }
  initIndexedDB() {
    return new Promise((resolve, reject) => {
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
        resolve(this.db);
        this.loadExpensesFromStorage();
      };
      request.onerror = (event) => {
        console.error("Error al abrir la base de datos: ", event);
        reject(event);
      };
    });
  }

  async addExpense(date, category, description, amount) {
    await this.dbReady;
    if (!this.db) {
      console.error("Base de datos no está inicializada aún.");
      return;
    }
    const addCategory = new Category();
    addCategory.addCategory(category);
    const expense = new Expenses(date, category, description, amount);
    const transaction = this.db.transaction(["expenses"], "readwrite");
    const store = transaction.objectStore("expenses");
    store.add({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
    });
    transaction.oncomplete = () => {
      this.loadExpensesFromStorage();
    };
    transaction.onerror = (event) => {
      console.error("Error al agregar", event);
    };
  }

  async loadExpensesFromStorage() {
    await this.dbReady;
    if (!this.db) {
      console.error("Base de datos no está inicializada aún.");
      return [];
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["expenses"], "readonly");
      const store = transaction.objectStore("expenses");
      const request = store.getAll();
      request.onsuccess = (event) => {
        this.expenses = event.target.result;
        resolve(this.expenses);
        renderTable(this.expenses);
      };
      request.onerror = (event) => {
        console.error("Error al cargar los datos ", event);
        reject(event);
      };
    });
  }

  async deleteExpense(id) {
    await this.dbReady;
    if (!this.db) {
      console.error("Base de datos no está inicializada aún.");
      return;
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["expenses"], "readwrite");
      const store = transaction.objectStore("expenses");
      const request = store.delete(id);
      console.log(request);
      request.onsuccess = () => {
        this.loadExpensesFromStorage();
        resolve();
      };
      request.onerror = (event) => {
        console.error("Error al eliminar el gasto ", event);
        reject(event);
      };
    });
  }

  async updateExpense(updatedData) {
    console.log(updatedData, "updatedaaaaa");
    await this.dbReady;
    if (!this.db) {
      console.error("Base de datos no está inicializada aún.");
      return;
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["expenses"], "readwrite");
      const store = transaction.objectStore("expenses");
      const request = store.put(updatedData);
      request.onsuccess = () => {
        this.loadExpensesFromStorage();
        resolve();
      };
      request.onerror = (event) => {
        console.error("Error al actualizar el gasto ", event);
        reject(event);
      };
    });
  }

  getTotalExpenses() {
    return this.expenses.reduce((acc, val) => acc + val.amount, 0);
  }

  getExpensesByCategory() {
    return sumByCategory(this.expenses);
  }
}
