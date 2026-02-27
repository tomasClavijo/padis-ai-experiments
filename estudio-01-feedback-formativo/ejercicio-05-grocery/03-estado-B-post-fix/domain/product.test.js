import { Product, Categories } from "./product.js";

describe("Product", () => {
  test("should create a product with valid data", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.getName()).toBe("Manzana");
    expect(product.getPrice()).toBe(100);
    expect(product.getCategory()).toBe(Categories.Fruits);
  });

  test("should throw error for empty name", () => {
    expect(() => new Product("", 100, Categories.Fruits)).toThrow();
  });

  test("should throw error for invalid price", () => {
    expect(() => new Product("Manzana", -5, Categories.Fruits)).toThrow();
  });

  test("should throw error for invalid category", () => {
    expect(() => new Product("Manzana", 100, "Invalida")).toThrow();
  });

  test("should initialize discount to 0", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.getDiscount()).toBe(0);
  });

  test("should set discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(15);
    expect(product.getDiscount()).toBe(15);
  });

  test("should throw for negative discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(() => product.setDiscount(-5)).toThrow();
  });

  test("toString without discount shows name and price", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.toString()).toBe("Manzana - $100");
  });

  test("toString with discount shows percentage", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(10);
    expect(product.toString()).toBe("Manzana - $100 (10% desc.)");
  });
});
