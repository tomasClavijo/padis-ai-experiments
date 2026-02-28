const Categories = Object.freeze({
  Fruits: "Frutas",
  Vegetables: "Verduras",
});

class Product {
  #name;
  #price;
  #category;
  #discount;

  constructor(name, price, category) {
    if (!name || name.trim() === "") {
      throw new Error("El nombre del producto no puede estar vacío");
    }
    if (price <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }

    this.#name = name.trim();
    this.#price = Math.trunc(price);
    this.#category = category;
    this.#discount = 0;
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getCategory() {
    return this.#category;
  }

  getDiscount() {
    return this.#discount;
  }

  setDiscount(discount) {
    if (
      typeof discount !== "number" ||
      !Number.isInteger(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      throw new Error(
        "El descuento debe ser un número entero entre 0 y 100"
      );
    }
    this.#discount = Math.trunc(discount);
  }

  toString() {
    let result = `Producto: ${this.#name}, Precio: ${this.#price}, Categoría: ${this.#category}`;
    if (this.#discount > 0) {
      result += `, Descuento: ${this.#discount}%`;
    }
    return result;
  }
}

export { Product, Categories };
