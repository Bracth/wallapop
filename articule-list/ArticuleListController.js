import ArticuleListService from "./ArticuleListService.js";
import {
  buildArticuleDetailView,
  buildArticuleView,
  buildArticuleListSpinnerView,
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
        console.log("There aren't any articules");
      }

      for (const articule of articules) {
        const articuleDivElement = document.createElement("div");
        const articuleTemplate = buildArticuleDetailView(articule);

        articuleDivElement.innerHTML = articuleTemplate;
        this.articuleListElement.appendChild(articuleDivElement);
      }
    } catch (error) {
    } finally {
      const loader = this.articuleListElement.querySelector(".loader");
      loader.remove();
    }
  }
}
