import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import ArticuleListService from "../articule-list/ArticuleListService.js";
import { buildArticuleDetailView } from "../articule-list/ArticuleListView.js";

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
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
