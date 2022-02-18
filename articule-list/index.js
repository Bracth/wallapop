import { NotificationController } from "../shared/notification/NotificationController.js";
import { ArticuleListController } from "./ArticuleListController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const articuleListElement = document.querySelector("#articule-list");

  const notificationElement = document.querySelector(".notification");

  const searchFormElement = document.querySelector("form");

  const notificationContoller = new NotificationController(notificationElement);

  const articuleListController = new ArticuleListController(
    articuleListElement,
    searchFormElement
  );

  articuleListController.showArticules();
});
