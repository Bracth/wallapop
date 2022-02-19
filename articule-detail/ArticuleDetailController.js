"use strict";

import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import ArticuleListService from "../articule-list/ArticuleListService.js";
import {
  buildArticuleDetailView,
  buildArticuleListSpinnerView,
  buildEditFormArticule,
} from "../articule-list/ArticuleListView.js";
import { decodeToken } from "../utils/decodeToken.js";

export class ArticuleDetailController {
  constructor(articuleDetailElement) {
    this.articuleDetailElement = articuleDetailElement;
    this.articule = null;
    this.articuleId = null;
    this.articuleEditFormElement = null;
  }

  async showArticule(articuleId) {
    if (!articuleId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id of the articule is not valid"
      );

      return;
    }
    this.articuleId = articuleId;

    const spinnerElement = buildArticuleListSpinnerView();

    this.articuleDetailElement.appendChild(spinnerElement);

    try {
      this.articule = await ArticuleListService.getArticule(articuleId);
      const articuleTemplate = buildArticuleDetailView(this.articule);
      this.articuleDetailElement.innerHTML = articuleTemplate;

      this.handleDeleteButton();
      this.handleEditButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    } finally {
      const loader = this.articuleDetailElement.querySelector(".loader");

      if (loader) {
        loader.remove();
      }
    }
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      const userInfo = decodeToken(loggedUserToken);

      const isOwner = this.isArticuleOwner(userInfo.userId);

      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  handleEditButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      const userInfo = decodeToken(loggedUserToken);

      const isOwner = this.isArticuleOwner(userInfo.userId);

      if (isOwner) {
        this.drawEditButton();
      }
    }
  }

  isArticuleOwner(userId) {
    return userId === this.articule.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Delete Articule";
    buttonElement.classList = "btn btn-danger";

    this.articuleDetailElement
      .querySelector(".card-footer")
      .appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      this.deleteArticule();
    });
  }

  drawEditButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Editing Articule";
    buttonElement.classList = "btn btn-warning";

    this.articuleDetailElement
      .querySelector(".card-footer")
      .appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      const editFormTemplate = buildEditFormArticule(this.articule);
      this.articuleDetailElement.innerHTML = editFormTemplate;

      this.articuleEditFormElement =
        this.articuleDetailElement.querySelector("form");

      this.onAnyInputChange();

      this.articuleEditFormElement.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(this.articuleEditFormElement);

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

        if (image) {
          const isValidImageUrl = this.checkUrl(image);

          if (!isValidImageUrl) {
            pubSub.publish(
              pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
              "The image url is not valid"
            );
            return;
          }
        }

        const articuleBody = {
          product,
          image,
          isSelling,
          description,
          price,
        };

        const spinnerElement = buildArticuleListSpinnerView();

        this.articuleDetailElement.appendChild(spinnerElement);
        this.editArticule(articuleBody);
      });
    });
  }

  async deleteArticule() {
    const shouldDelete = window.confirm(
      "are you sure about deleting this articule?"
    );

    if (shouldDelete) {
      try {
        await ArticuleListService.deleteArticule(this.articule.id);
        window.location.href = "/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      }
    }
  }

  chekIfPriceIsMoreThanCero(price) {
    return price > 0;
  }

  async editArticule(articuleBody) {
    try {
      await ArticuleListService.editArticule(this.articuleId, articuleBody);
      window.location.href = `/articuleDetail.html?id=${this.articuleId}`;
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      const loader = this.articuleDetailElement.querySelector(".loader");
      loader.remove();
    }
  }

  onAnyInputChange(articuleEditFormElement) {
    const inputElements = Array.from(
      this.articuleEditFormElement.querySelectorAll("input")
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
      this.articuleEditFormElement
        .querySelector("button")
        .removeAttribute("disabled");
    } else {
      this.articuleEditFormElement
        .querySelector("button")
        .setAttribute("disabled", "");
    }
  }

  checkUrl(url) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    return pattern.test(url);
  }
}
