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

  addProduct(name, price, category) {
    const product = new Product(name, price, category);
    this.#products.push(product);
  }

  getProducts() {
    return [...this.#products];
  }

  totalProducts() {
    return this.#products.length;
  }

  totalDiscountedProducts() {
    return this.#products.length;
  }
}

export { Grocery };
