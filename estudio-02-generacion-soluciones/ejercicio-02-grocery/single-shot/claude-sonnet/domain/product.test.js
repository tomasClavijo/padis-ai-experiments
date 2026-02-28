import { Product, Categories } from "./product.js";

describe("Product", () => {
  describe("Creación válida", () => {
    test("debe crear un producto con todos los campos correctos", () => {
      const product = new Product("Manzana", 1500, Categories.Fruits);
      expect(product.getName()).toBe("Manzana");
      expect(product.getPrice()).toBe(1500);
      expect(product.getCategory()).toBe("Frutas");
    });

    test("el descuento por defecto debe ser 0", () => {
      const product = new Product("Lechuga", 800, Categories.Vegetables);
      expect(product.getDiscount()).toBe(0);
    });

    test("debe truncar el precio si no es entero (Math.trunc)", () => {
      const product = new Product("Banana", 1299.99, Categories.Fruits);
      expect(product.getPrice()).toBe(1299);
    });

    test("debe recortar espacios del nombre", () => {
      const product = new Product("  Manzana  ", 500, Categories.Fruits);
      expect(product.getName()).toBe("Manzana");
    });
  });

  describe("Validación del constructor", () => {
    test("debe lanzar error si el nombre está vacío", () => {
      expect(() => new Product("", 1000, Categories.Fruits)).toThrow(
        "El nombre del producto no puede estar vacío."
      );
    });

    test("debe lanzar error si el nombre es solo espacios", () => {
      expect(() => new Product("   ", 1000, Categories.Fruits)).toThrow(
        "El nombre del producto no puede estar vacío."
      );
    });

    test("debe lanzar error si el precio es negativo", () => {
      expect(() => new Product("Manzana", -500, Categories.Fruits)).toThrow(
        "El precio debe ser mayor que 0."
      );
    });

    test("debe lanzar error si el precio es 0", () => {
      expect(() => new Product("Manzana", 0, Categories.Fruits)).toThrow(
        "El precio debe ser mayor que 0."
      );
    });
  });

  describe("setDiscount - valores válidos", () => {
    let product;

    beforeEach(() => {
      product = new Product("Tomate", 350, Categories.Vegetables);
    });

    test("debe establecer un descuento válido de 10%", () => {
      product.setDiscount(10);
      expect(product.getDiscount()).toBe(10);
    });

    test("debe aceptar descuento 0 (valor límite inferior)", () => {
      product.setDiscount(0);
      expect(product.getDiscount()).toBe(0);
    });

    test("debe aceptar descuento 100 (valor límite superior)", () => {
      product.setDiscount(100);
      expect(product.getDiscount()).toBe(100);
    });
  });

  describe("setDiscount - valores inválidos", () => {
    let product;

    beforeEach(() => {
      product = new Product("Zanahoria", 200, Categories.Vegetables);
    });

    test("debe lanzar error con descuento negativo", () => {
      expect(() => product.setDiscount(-1)).toThrow(
        "El descuento debe estar entre 0 y 100."
      );
    });

    test("debe lanzar error con descuento mayor a 100", () => {
      expect(() => product.setDiscount(101)).toThrow(
        "El descuento debe estar entre 0 y 100."
      );
    });

    test("debe lanzar error con descuento decimal (3.5)", () => {
      expect(() => product.setDiscount(3.5)).toThrow(
        "El descuento debe ser un número entero."
      );
    });

    test("debe lanzar error con NaN", () => {
      expect(() => product.setDiscount(NaN)).toThrow(
        "El descuento debe ser un número entero."
      );
    });

    test("debe lanzar error con string", () => {
      expect(() => product.setDiscount("10")).toThrow(
        "El descuento debe ser un número entero."
      );
    });

    test("debe lanzar error con null", () => {
      expect(() => product.setDiscount(null)).toThrow(
        "El descuento debe ser un número entero."
      );
    });
  });

  describe("toString", () => {
    test("no debe mostrar descuento cuando es 0", () => {
      const product = new Product("Lechuga", 800, Categories.Vegetables);
      expect(product.toString()).toBe("Lechuga - $800 (Verduras)");
      expect(product.toString()).not.toContain("Descuento");
    });

    test("debe mostrar descuento cuando es mayor a 0", () => {
      const product = new Product("Lechuga", 800, Categories.Vegetables);
      product.setDiscount(15);
      expect(product.toString()).toBe(
        "Lechuga - $800 (Verduras) [Descuento: 15%]"
      );
    });
  });
});
