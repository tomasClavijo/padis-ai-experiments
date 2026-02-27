import { Product, Categories } from "./product.js";

describe("Product", () => {
  test("should create a product with valid data", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.getName()).toBe("Manzana");
    expect(product.getPrice()).toBe(100);
    expect(product.getCategory()).toBe(Categories.Fruits);
  });

  test("should trim name", () => {
    const product = new Product("  Manzana  ", 100, Categories.Fruits);
    expect(product.getName()).toBe("Manzana");
  });

  test("should throw error for empty name", () => {
    expect(() => new Product("", 100, Categories.Fruits)).toThrow(
      "El nombre no puede ser vacío.",
    );
  });

  test("should throw error for whitespace-only name", () => {
    expect(() => new Product("   ", 100, Categories.Fruits)).toThrow(
      "El nombre no puede ser vacío.",
    );
  });

  test("should throw error for non-integer price", () => {
    expect(() => new Product("Manzana", 10.5, Categories.Fruits)).toThrow(
      "El precio debe ser un entero positivo.",
    );
  });

  test("should throw error for zero price", () => {
    expect(() => new Product("Manzana", 0, Categories.Fruits)).toThrow(
      "El precio debe ser un entero positivo.",
    );
  });

  test("should throw error for negative price", () => {
    expect(() => new Product("Manzana", -5, Categories.Fruits)).toThrow(
      "El precio debe ser un entero positivo.",
    );
  });

  test("should throw error for invalid category", () => {
    expect(() => new Product("Manzana", 100, "Invalida")).toThrow(
      "Categoría inválida.",
    );
  });

  test("should initialize discount to 0", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(product.getDiscount()).toBe(0);
  });

  test("should set valid discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(15);
    expect(product.getDiscount()).toBe(15);
  });

  test("should allow discount of 0", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(0);
    expect(product.getDiscount()).toBe(0);
  });

  test("should allow discount of 100", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(100);
    expect(product.getDiscount()).toBe(100);
  });

  test("should throw for negative discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(() => product.setDiscount(-1)).toThrow(
      "El descuento debe estar entre 0 y 100.",
    );
  });

  test("should throw for discount greater than 100", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(() => product.setDiscount(101)).toThrow(
      "El descuento debe estar entre 0 y 100.",
    );
  });

  test("should throw for non-integer discount", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    expect(() => product.setDiscount(10.5)).toThrow(
      "El descuento debe ser un número entero.",
    );
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

  test("toString with discount 0 does not show percentage", () => {
    const product = new Product("Manzana", 100, Categories.Fruits);
    product.setDiscount(0);
    expect(product.toString()).toBe("Manzana - $100");
  });
});
