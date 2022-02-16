export default {
  async getArticules() {
    const url = "http://localhost:8000/api/articules";

    let response;
    let articules;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("I was unable to get the articules");
    }

    if (!response.ok) {
      throw new Error("Articule not found");
    }

    try {
      articules = await response.json();
    } catch (error) {
      throw new Error("I was unable to transform the response to json");
    }

    const transformArticules = this.transformArticules(articules);

    return transformArticules;
  },

  transformArticules(articules) {
    return articules.map((articule) => {
      const transformedArticule = {
        product: articule.product,
        userId: articule.userId,
        id: articule.id,
        date: articule.updatedAt,
        isSelling: articule.sell,
        image:
          "https://decoratedi.com/11913-thickbox_default/carro-de-compra-para-supermercado-150-litros.jpg",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, placeat odit, quae recusandae inventore nemo ratione odio deserunt repellat neque molestias eum nam omnis repudiandae id. Aperiam porro iure harum.",
      };

      return transformedArticule;
    });
  },
};
