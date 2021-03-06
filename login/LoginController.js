import { buildArticuleListSpinnerView } from "../articule-list/ArticuleListView.js";
import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";

export class LoginController {
  constructor(loginFormElement) {
    this.loginFormElement = loginFormElement;
    this.loginFormElementHtml = loginFormElement.innerHTML;

    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitLoginForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.loginFormElement.querySelectorAll("input")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputFilled) {
          this.loginFormElement
            .querySelector("button")
            .removeAttribute("disabled");
        } else {
          this.loginFormElement
            .querySelector("button")
            .setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitLoginForm() {
    this.loginFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const spinnerElement = buildArticuleListSpinnerView();
      this.loginFormElement.appendChild(spinnerElement);

      const formData = new FormData(this.loginFormElement);

      const username = formData.get("user");
      const password = formData.get("password");

      this.loginUser(username, password);
    });
  }

  async loginUser(username, password) {
    try {
      await signupService.loginUser(username, password);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    } finally {
      const loader = this.loginFormElement.querySelector(".loader");
      loader.remove();
    }
  }
}
