import { Grocery } from "./grocery.js";

describe("Grocery", () => {
  test("should create grocery with name", () => {
    const grocery = new Grocery("Mi Almacén");
    expect(grocery.getName()).toBe("Mi Almacén");
  });

  test("should add product", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    expect(grocery.totalProducts()).toBe(1);
  });

  test("should add product with discount", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas", 20);
    const products = grocery.getProducts();
    expect(products[0].getDiscount()).toBe(20);
  });

  test("totalDiscountedProducts with no discounts", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    expect(grocery.totalDiscountedProducts()).toBe(0);
  });

  test("totalDiscountedProducts with some discounts", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas", 10);
    grocery.addProduct("Lechuga", 50, "Verduras");
    expect(grocery.totalDiscountedProducts()).toBe(1);
  });
});
