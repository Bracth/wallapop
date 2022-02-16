import { ArticuleDetailController } from "./ArticuleDetailController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const articuleDetailElement = document.querySelector(".articule-detail");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const searchParams = new URLSearchParams(window.location.search);

  const articuleId = searchParams.get("id");

  const articuleDetailController = new ArticuleDetailController(
    articuleDetailElement
  );
  articuleDetailController.showArticule(articuleId);
});
