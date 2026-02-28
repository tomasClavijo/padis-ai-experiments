import { Grocery } from "./grocery.js";
import { Categories } from "./product.js";

describe("Grocery", () => {
  let grocery;

  beforeEach(() => {
    grocery = new Grocery("Mi Tienda");
  });

  test("debe crear una tienda correctamente", () => {
    expect(grocery.getName()).toBe("Mi Tienda");
    expect(grocery.getProducts()).toEqual([]);
  });

  test("debe agregar un producto sin descuento", () => {
    grocery.addProduct("Manzana", 1500, Categories.Fruits);
    expect(grocery.totalProducts()).toBe(1);
    expect(grocery.getProducts()[0].getName()).toBe("Manzana");
  });

  test("debe agregar un producto con descuento", () => {
    grocery.addProduct("Lechuga", 800, Categories.Vegetables, 10);
    expect(grocery.totalProducts()).toBe(1);
    expect(grocery.getProducts()[0].getDiscount()).toBe(10);
  });

  test("debe contar el total de productos", () => {
    grocery.addProduct("Manzana", 1500, Categories.Fruits);
    grocery.addProduct("Pera", 1200, Categories.Fruits);
    grocery.addProduct("Tomate", 600, Categories.Vegetables);
    expect(grocery.totalProducts()).toBe(3);
  });

  test("debe contar los productos con descuento", () => {
    grocery.addProduct("Manzana", 1500, Categories.Fruits, 10);
    grocery.addProduct("Pera", 1200, Categories.Fruits);
    grocery.addProduct("Tomate", 600, Categories.Vegetables, 25);
    expect(grocery.totalDiscountedProducts()).toBe(2);
  });

  test("debe retornar 0 si no hay productos con descuento", () => {
    grocery.addProduct("Manzana", 1500, Categories.Fruits);
    expect(grocery.totalDiscountedProducts()).toBe(0);
  });

  test("getProducts retorna una copia del arreglo", () => {
    grocery.addProduct("Manzana", 1500, Categories.Fruits);
    const products = grocery.getProducts();
    products.pop();
    expect(grocery.totalProducts()).toBe(1);
  });
});
