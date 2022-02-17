export function buildArticuleView(articule) {
  const articuleDetailView = buildArticuleDetailView(articule);
  let articuleTemplate = `
    <a href="/articuleDetail.html?id=${articule.id}">
      ${articuleDetailView}
    </a>
  `;

  return articuleTemplate;
}

export function buildArticuleDetailView(articule) {
  const currentTime = new Date(articule.date).toLocaleString();
  let isSelling;

  if (articule.isSelling) {
    isSelling = "Selling";
  } else {
    isSelling = "Buying";
  }

  const articuleTemplate = `
       <div class="col">
                    <div class="card h-100">
                        <img src=${articule.image} class="card-img-top" alt=${articule.product}>
                        <div class="card-body">
                            <h5 class="card-title">${articule.product}</h5>
                            <p class="card-text">${isSelling}</p>
                            <p class="card-text">${articule.description}</p>
                            <p class="card-text">${articule.price}$</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Created: ${currentTime}</small>
                        </div>
                    </div>
                </div>
        `;

  return articuleTemplate;
}

export function buildArticuleListSpinnerView() {
  const divElement = document.createElement("div");
  divElement.classList.add("loader");
  divElement.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `;

  return divElement;
}

export function buildNotFoundArticulesView() {
  return `
    <h1>Ooops!!! no hay ningún tweet!!! =(</h1>
  `;
}
