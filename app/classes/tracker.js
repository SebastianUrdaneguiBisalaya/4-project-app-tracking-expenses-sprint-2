import { Expenses } from "./expenses.js";
import { Category } from "./category.js";
import { sumByCategory } from "../../utils/sumByCategory.js";
// import { renderTable } from "../functions/createTable.js";

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
        // renderTable(this.expenses);
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

  async getTotalExpenses() {
    const expenses = await this.loadExpensesFromStorage();
    if (!expenses || expenses.length === 0) {
      return [];
    }
    const total = expenses.reduce(
      (acc, val) => acc + parseFloat(val.amount),
      0
    );
    return total;
  }

  async getExpensesByCategory() {
    const expenses = await this.loadExpensesFromStorage();
    const result = sumByCategory(expenses);
    return result;
  }

  async getExpensesByFilter({ category = '', dateStart = '', dateEnd = '' }) {
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
            const allExpenses = event.target.result;

            // Filtrar por categoría
            let filteredExpenses = allExpenses.filter(expense => category === '' || expense.category === category);

            // Filtrar por fechas
            if (dateStart) {
              filteredExpenses = filteredExpenses.filter(expense => expense.date >= dateStart);
            }
            if (dateEnd) {
                filteredExpenses = filteredExpenses.filter(expense => expense.date <= dateEnd);
            }

            this.expenses = filteredExpenses;
            renderTable(this.expenses);
            resolve(this.expenses);
        };
        request.onerror = (event) => {
            console.error("Error al cargar los datos ", event);
            reject(event);
        };
    });
  }

}
