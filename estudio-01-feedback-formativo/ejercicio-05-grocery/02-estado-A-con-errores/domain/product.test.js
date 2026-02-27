import { Product, Categories } from "./product.js";

describe("Product", () => {
  test("should create a product with valid data", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.getName()).toBe("Manzana");
    expect(product.getPrice()).toBe(100);
    expect(product.getCategory()).toBe(Categories.Fruits);
  });

  test("should set and get discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(10);
    expect(product.getDiscount()).toBe(10);
  });

  test("should return string representation", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(10);
    expect(product.toString()).toContain("Manzana");
  });
});
