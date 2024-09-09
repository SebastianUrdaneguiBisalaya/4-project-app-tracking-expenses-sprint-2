export class Category {
  constructor() {
    this.categories = [];
    this.loadCategoriesFromStorage();
  }
  addCategory(categoryName) {
    if (!this.categories.includes(categoryName)) {
      this.categories.push(categoryName);
      this.saveCategoryToStorage();
    }
  }
  getCategory() {
    return this.categories;
  }
  saveCategoryToStorage() {
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }
  loadCategoriesFromStorage() {
    const storageData = JSON.parse(localStorage.getItem("categories")) || [];
    this.categories = storageData;
  }
}
