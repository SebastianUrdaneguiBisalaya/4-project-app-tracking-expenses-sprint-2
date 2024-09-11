import { Expenses } from "../classes/expenses.js";
import { Tracker } from "../classes/tracker.js";
import { Category } from "../classes/category.js";

export function getFilteredData() {
    const newTracker = new Tracker();
    const categoryManager = new Category();
    const btnFilter = document.getElementById("filterForm");

    btnFilter.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const category = document.getElementById("categoryInput").value.trim();
        const dateStart = document.getElementById("dateStart").value.trim();
        const dateDone = document.getElementById("dateDone").value.trim();
        
        if (!category && !dateStart && !dateDone ) {
            alert("Por favor, ingrese datos en los campos");
            return;
        }
        if(dateStart > dateDone){
            alert("La fecha inicial no puede ser mayor a la final");
            return;
        }
        if(!dateStart && dateDone){
            alert("Ingrese una fecha inicial");
            return;
        }
        if(!dateDone && dateStart){
            alert("Ingrese una fecha final");
            return;
        }
        
        newTracker.getExpensesByFilterCategory(category).then((data) => console.log(data));

      });
}