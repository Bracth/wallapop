import { pubSub } from "../shared/pubSub.js";
import ArticuleListService from "./ArticuleListService.js";
import {
  buildArticuleDetailView,
  buildArticuleView,
  buildArticuleListSpinnerView,
  buildNotFoundArticulesView,
} from "./ArticuleListView.js";

export class ArticuleListController {
  articuleListElement = null;

  constructor(articuleListElement) {
    this.articuleListElement = articuleListElement;
  }

  async showArticules() {
    let articules;
    const spinnerTemplate = buildArticuleListSpinnerView();

    this.articuleListElement.innerHTML = spinnerTemplate;

    try {
      articules = await ArticuleListService.getArticules();

      if (articules.length === 0) {
        this.articuleListElement.innerHTML = buildNotFoundArticulesView();
      }

      for (const articule of articules) {
        const articuleDivElement = document.createElement("div");
        const articuleTemplate = buildArticuleDetailView(articule);

        articuleDivElement.innerHTML = articuleTemplate;
        this.articuleListElement.appendChild(articuleDivElement);
      }
    } catch (error) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error getting articules"
      );
    } finally {
      const loader = this.articuleListElement.querySelector(".loader");
      loader.remove();
    }
  }
}
