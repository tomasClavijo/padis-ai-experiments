import { Grocery } from "./grocery.js";

describe("Grocery", () => {
  test("should create grocery with name", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(grocery.getName()).toBe("Mi Almacén");
  });

  test("should add product without discount", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    expect(grocery.totalProducts()).toBe(1);
    expect(grocery.getProducts()[0].getDiscount()).toBe(0);
  });

  test("should add product with discount", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas", 20);
    expect(grocery.getProducts()[0].getDiscount()).toBe(20);
  });

  test("should propagate error for invalid product", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(() => grocery.addProduct("", 100, "Frutas")).toThrow();
  });

  test("should propagate error for invalid discount", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(() => grocery.addProduct("Manzana", 100, "Frutas", 150)).toThrow();
  });

  test("getProducts returns copy of array", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    const products = grocery.getProducts();
    expect(products.length).toBe(1);
    products.push(null);
    expect(grocery.getProducts().length).toBe(1);
  });

  test("totalProducts returns correct count", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(grocery.totalProducts()).toBe(0);
    grocery.addProduct("Manzana", 100, "Frutas");
    grocery.addProduct("Lechuga", 50, "Verduras");
    expect(grocery.totalProducts()).toBe(2);
  });

  test("totalDiscountedProducts with empty grocery", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(grocery.totalDiscountedProducts()).toBe(0);
  });

  test("totalDiscountedProducts with no discounted products", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    grocery.addProduct("Lechuga", 50, "Verduras");
    expect(grocery.totalDiscountedProducts()).toBe(0);
  });

  test("totalDiscountedProducts with some discounted products", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas", 10);
    grocery.addProduct("Banana", 80, "Frutas");
    grocery.addProduct("Lechuga", 50, "Verduras", 25);
    expect(grocery.totalDiscountedProducts()).toBe(2);
  });

  test("totalDiscountedProducts with all discounted products", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas", 10);
    grocery.addProduct("Lechuga", 50, "Verduras", 25);
    expect(grocery.totalDiscountedProducts()).toBe(2);
  });
});
