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

export function buildEditFormArticule() {
  return `
    <form class="container mt-3">
            <div class="mb-3">
                <label for="product" class="form-label">Product: </label>
                <input type="text" class="form-control" name="product" id="product" required>
            </div>
            <div class="mb-3">
                <label for="imageUrl" class="form-label">Image URL: </label>
                <input type="text" class="form-control" name="imageUrl" id="imageUrl">
            </div>
            <div class="mb-3 form-check">
                <label for="isSelling" class="form-check-label">Are you selling the product? </label>
                <input type="checkbox" class="form-check-input" name="isSelling" id="isSelling">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description: </label>
                <input type="text" class="form-control" name="description" id="description" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price: </label>
                <input type="number" class="form-control" name="price" id="number" required>
            </div>
            <button type="submit" class="btn btn-primary" disabled>Submit</button>
        </form>
  `;
}
