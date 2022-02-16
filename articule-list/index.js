import {ArticuleListController} from "./ArticuleListController.js"

document.addEventListener("DOMContentLoaded", async () => {
    const articuleListElement = document.querySelector("#articule-list");
    
    const articuleListController = new ArticuleListController(articuleListElement);
   
    articuleListController.showArticules();
})