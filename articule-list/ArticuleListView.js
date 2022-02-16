export function buildArticuleView(articule) {
  const articuleDetailView = buildArticuleDetailView(articule);
}

export function buildArticuleDetailView(articule) {
  const currentTime = new Date(articule.date).toLocaleString();
  let isSelling;

  if (articule.isSelling) {
    isSelling = "Selling";
  } else {
    isSelling = "Looking";
  }

  const articuleTemplate = `
        <h1>${articule.product}</h1>
        <img src=${articule.image} alt=${articule.product}>
        <p>${isSelling}</p>
        <p>I am the user ${articule.userId}</p>
        <p>${articule.description}</p>
        <p>${articule.price}</p>
        <span>${currentTime}</span>
        `;

  return articuleTemplate;
}

export function buildArticuleListSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}

export function buildNotFoundArticulesView() {
  return `
    <h1>Ooops!!! no hay ningún tweet!!! =(</h1>
  `;
}
