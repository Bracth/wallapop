import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import ArticuleListService from "../articule-list/ArticuleListService.js";
import { buildArticuleDetailView } from "../articule-list/ArticuleListView.js";
import { decodeToken } from "../utils/decodeToken.js";

export class ArticuleDetailController {
  constructor(articuleDetailElement) {
    this.articuleDetailElement = articuleDetailElement;
    this.articule = null;
  }

  async showArticule(articuleId) {
    if (!articuleId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id of the articule is not valid"
      );

      return;
    }

    try {
      this.articule = await ArticuleListService.getArticule(articuleId);
      const articuleTemplate = buildArticuleDetailView(this.articule);
      this.articuleDetailElement.innerHTML = articuleTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
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

  isArticuleOwner(userId) {
    return userId === this.articule.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Delete Articule";
    buttonElement.classList = "btn btn-secondary";

    this.articuleDetailElement
      .querySelector(".card-footer")
      .appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
      this.deleteArticule();
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
}
