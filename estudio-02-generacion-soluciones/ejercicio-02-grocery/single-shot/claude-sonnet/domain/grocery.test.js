import { Grocery } from "./grocery.js";
import { Categories } from "./product.js";

describe("Grocery", () => {
  let grocery;

  beforeEach(() => {
    grocery = new Grocery("Mi Almacén");
  });

  describe("Estado inicial", () => {
    test("debe iniciar con una lista vacía de productos", () => {
      expect(grocery.getProducts()).toEqual([]);
      expect(grocery.totalProducts()).toBe(0);
    });

    test("debe retornar el nombre del almacén", () => {
      expect(grocery.getName()).toBe("Mi Almacén");
    });
  });

  describe("addProduct", () => {
    test("debe agregar un producto sin descuento", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits);
      expect(grocery.totalProducts()).toBe(1);
      expect(grocery.getProducts()[0].getDiscount()).toBe(0);
    });

    test("debe agregar un producto con descuento", () => {
      grocery.addProduct("Lechuga", 800, Categories.Vegetables, 10);
      expect(grocery.totalProducts()).toBe(1);
      expect(grocery.getProducts()[0].getDiscount()).toBe(10);
    });

    test("debe agregar múltiples productos", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits);
      grocery.addProduct("Tomate", 300, Categories.Vegetables);
      grocery.addProduct("Banana", 500, Categories.Fruits, 15);
      expect(grocery.totalProducts()).toBe(3);
    });

    test("el descuento por defecto es 0 si no se proporciona", () => {
      const product = grocery.addProduct("Naranja", 600, Categories.Fruits);
      expect(product.getDiscount()).toBe(0);
    });
  });

  describe("totalDiscountedProducts", () => {
    test("debe retornar 0 con lista vacía", () => {
      expect(grocery.totalDiscountedProducts()).toBe(0);
    });

    test("debe retornar 0 si ningún producto tiene descuento", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits);
      grocery.addProduct("Tomate", 300, Categories.Vegetables);
      expect(grocery.totalDiscountedProducts()).toBe(0);
    });

    test("debe contar solo los productos con descuento (lista mixta)", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits, 10);
      grocery.addProduct("Tomate", 300, Categories.Vegetables);
      grocery.addProduct("Lechuga", 800, Categories.Vegetables, 20);
      expect(grocery.totalDiscountedProducts()).toBe(2);
    });

    test("debe contar todos si todos tienen descuento", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits, 5);
      grocery.addProduct("Tomate", 300, Categories.Vegetables, 10);
      grocery.addProduct("Banana", 500, Categories.Fruits, 15);
      expect(grocery.totalDiscountedProducts()).toBe(3);
    });

    test("debe manejar descuentos en valores extremos (0 y 100)", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits, 0);
      grocery.addProduct("Tomate", 300, Categories.Vegetables, 100);
      expect(grocery.totalDiscountedProducts()).toBe(1);
    });
  });

  describe("getProducts", () => {
    test("debe retornar una copia del arreglo (no la referencia original)", () => {
      grocery.addProduct("Manzana", 1500, Categories.Fruits);
      const products = grocery.getProducts();
      products.push("intruso");
      expect(grocery.totalProducts()).toBe(1);
    });
  });

  describe("Propagación de errores", () => {
    test("debe propagar error del constructor de Product (nombre vacío)", () => {
      expect(() =>
        grocery.addProduct("", 1500, Categories.Fruits)
      ).toThrow("El nombre del producto no puede estar vacío.");
    });

    test("debe propagar error del constructor de Product (precio inválido)", () => {
      expect(() =>
        grocery.addProduct("Manzana", -100, Categories.Fruits)
      ).toThrow("El precio debe ser mayor que 0.");
    });

    test("debe propagar error de setDiscount (descuento inválido)", () => {
      expect(() =>
        grocery.addProduct("Manzana", 1500, Categories.Fruits, 150)
      ).toThrow("El descuento debe estar entre 0 y 100.");
    });

    test("debe propagar error de setDiscount (descuento decimal)", () => {
      expect(() =>
        grocery.addProduct("Manzana", 1500, Categories.Fruits, 10.5)
      ).toThrow("El descuento debe ser un número entero.");
    });
  });
});
