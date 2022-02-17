import { CreatingArticuleController } from "./CreatingArticuleController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { signupService } from "../signup/SignupService.js";

const loggedUserToken = signupService.getLoggedUser();

if (!loggedUserToken) {
  window.alert("You have to be logged in to create an articule");
  location.href = "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const creatingArticuleController = new CreatingArticuleController(
    formElement
  );
  const notificationController = new NotificationController(
    notificationElement
  );
});
