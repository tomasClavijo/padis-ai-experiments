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

  test("totalDiscountedProducts should return count", () => {
    const grocery = new Grocery("Mi Almacén");
    grocery.addProduct("Manzana", 100, "Frutas");
    expect(grocery.totalDiscountedProducts()).toBe(1);
  });
});
