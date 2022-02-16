import { NotificationController } from "../shared/notification/NotificationContoller.js";
import { ArticuleListController } from "./ArticuleListController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const articuleListElement = document.querySelector("#articule-list");

  const notificationElement = document.querySelector(".notification");

  const notificationContoller = new NotificationController(notificationElement);

  const articuleListController = new ArticuleListController(
    articuleListElement
  );

  articuleListController.showArticules();
});
