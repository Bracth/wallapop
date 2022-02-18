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

  constructor(articuleListElement, searchFormElement) {
    this.articuleListElement = articuleListElement;
    this.articuleListElementHtml = articuleListElement.innerHTML;

    this.searchFormElement = searchFormElement;
    this.subscribteToSearchSubmit();
  }

  subscribteToSearchSubmit() {
    this.searchFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.searchFormElement);

      const searchQuery = formData.get("search");
      this.articuleListElement.innerHTML = this.articuleListElementBaseHtml;
      this.showArticules(searchQuery);
    });
  }

  async showArticules(searchQuery) {
    let articules;
    const spinnerElement = buildArticuleListSpinnerView();

    this.articuleListElement.appendChild(spinnerElement);

    try {
      articules = await ArticuleListService.getArticules(searchQuery);

      if (articules.length === 0) {
        this.articuleListElement.innerHTML = buildNotFoundArticulesView();
      }

      for (const articule of articules) {
        const articuleDivElement = document.createElement("div");
        const articuleTemplate = buildArticuleView(articule);

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
