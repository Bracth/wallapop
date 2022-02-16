import { signupService } from "../signup/SignupService.js";

export default {
  async getArticules() {
    const url = "http://localhost:8000/api/articules";
    const badUrl =
      "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

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

  async getArticule(articuleId) {
    const url = `http://localhost:8000/api/articules/${articuleId}`;

    let response;
    let articule;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("I was unable to go for the articule");
    }

    if (!response.ok) {
      throw new Error("Articule not found");
    }

    try {
      articule = await response.json();
    } catch (error) {
      throw new Error("I was unable to transform the response to json");
    }

    const transformedArticule = this.transformArticules([articule]);

    return transformedArticule[0];
  },

  async deleteArticule(articuleId) {
    const url = `http://localhost:8000/api/articules/${articuleId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("I was unale to delete the articule");
    }

    if (!response.ok) {
      throw new Error("Articule not found");
    }
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
