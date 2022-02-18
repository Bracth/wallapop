import ArticuleListService from "../articule-list/ArticuleListService.js";
import { pubSub } from "../shared/pubSub.js";
import { buildArticuleListSpinnerView } from "../articule-list/ArticuleListView.js";

export class CreatingArticuleController {
  constructor(creatingArticuleFormElement, searchFormElement) {
    this.creatingArticuleFormElement = creatingArticuleFormElement;
    this.searchFormElement = searchFormElement;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.onAnyInputChange();
    this.onSubmitForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.creatingArticuleFormElement.querySelectorAll("input")
    );

    const requiredInputElements = inputElements.filter((inputElemnt) => {
      return inputElemnt.required;
    });

    requiredInputElements.forEach((requiredInputElement) => {
      requiredInputElement.addEventListener("input", () => {
        this.checkIfAllInputsAllFilled(requiredInputElements);
      });
    });
  }

  checkIfAllInputsAllFilled(requiredInputElements) {
    const areAllInputsFilled = requiredInputElements.every(
      (requiredInputElement) => requiredInputElement.value
    );

    if (areAllInputsFilled) {
      this.creatingArticuleFormElement
        .querySelector("button")
        .removeAttribute("disabled");
    } else {
      this.creatingArticuleFormElement
        .querySelector("button")
        .setAttribute("disabled", "");
    }
  }

  onSubmitForm() {
    this.creatingArticuleFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.creatingArticuleFormElement);

      const product = formData.get("product");
      const image = formData.get("imageUrl");
      let isSelling = formData.get("isSelling");
      const description = formData.get("description");
      const price = parseInt(formData.get("price"));

      if (isSelling === "on") {
        isSelling = true;
      } else {
        isSelling = false;
      }

      const isPriceMoreThanCero = this.chekIfPriceIsMoreThanCero(price);

      if (!isPriceMoreThanCero) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "The price have to be more than cero"
        );
        return;
      }

      const articuleBody = {
        product,
        image,
        isSelling,
        description,
        price,
      };

      const spinnerElement = buildArticuleListSpinnerView();

      this.creatingArticuleFormElement.appendChild(spinnerElement);
      this.createArticule(articuleBody);
    });
  }

  async createArticule(articuleBody) {
    try {
      await ArticuleListService.createArticule(articuleBody);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    } finally {
      const loader = this.creatingArticuleFormElement.querySelector(".loader");
      loader.remove();
    }
  }

  chekIfPriceIsMoreThanCero(price) {
    return price > 0;
  }
}
