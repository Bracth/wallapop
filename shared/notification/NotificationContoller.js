import { buildNotificationView } from "./NotificationView.js";
import { pubSub } from "../pubSub.js";

export class NotificationController {
  constructor(notificationElement) {
    this.notificationElement = notificationElement;

    this.subcribeToEvents();
  }

  subcribeToEvents() {
    pubSub.subscribe(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, (message) => {
      this.show(message);
    });
  }

  show(message) {
    const notificationTemplate = buildNotificationView(message);

    this.notificationElement.innerHTML = notificationTemplate;

    const closeButtonElement = this.notificationElement.querySelector("button");

    closeButtonElement.addEventListener("click", (event) => {
      this.notificationElement.innerHTML = "";
    });
  }
}
