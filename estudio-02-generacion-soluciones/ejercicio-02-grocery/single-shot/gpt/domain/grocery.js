import { Product } from "./product.js";

class Grocery {
  #name;
  #products;

  constructor(name) {
    this.#name = name;
    this.#products = [];
  }

  getName() {
    return this.#name;
  }

  getProducts() {
    return [...this.#products];
  }

  addProduct(name, price, category, discount = 0) {
    const product = new Product(name, price, category);
    if (discount > 0) {
      product.setDiscount(discount);
    }
    this.#products.push(product);
    return product;
  }

  totalProducts() {
    return this.#products.length;
  }

  totalDiscountedProducts() {
    return this.#products.filter((p) => p.getDiscount() > 0).length;
  }
}

export { Grocery };
