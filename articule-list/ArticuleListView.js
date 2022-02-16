export function buildArticuleView(articule) {
    const articuleDetailView = buildArticuleDetailView(articule);
    
}

export function buildArticuleDetailView(articule) {
    const articuleTemplate = `
    <h1>I am the user ${ articule.userId }</h1>
    <p>${ articule.product }</p>
    <p>${ articule.price }</p>
    <p>${ articule.sell }</p>
    `;
    
    return articuleTemplate;
}