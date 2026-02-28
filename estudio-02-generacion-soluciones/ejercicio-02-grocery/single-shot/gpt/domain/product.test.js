import { Product, Categories } from "./product.js";

describe("Product", () => {
  test("debe crear un producto correctamente", () => {
    const product = new Product("Manzana", 1500, Categories.Fruits);
    expect(product.getName()).toBe("Manzana");
    expect(product.getPrice()).toBe(1500);
    expect(product.getCategory()).toBe("Frutas");
    expect(product.getDiscount()).toBe(0);
  });

  test("debe truncar el precio si no es entero", () => {
    const product = new Product("Pera", 1299.99, Categories.Fruits);
    expect(product.getPrice()).toBe(1299);
  });

  test("debe lanzar error si el nombre está vacío", () => {
    expect(() => new Product("", 1000, Categories.Fruits)).toThrow(
      "El nombre del producto no puede estar vacío"
    );
  });

  test("debe lanzar error si el precio es menor o igual a 0", () => {
    expect(() => new Product("Manzana", 0, Categories.Fruits)).toThrow(
      "El precio debe ser mayor a 0"
    );
    expect(() => new Product("Manzana", -500, Categories.Fruits)).toThrow(
      "El precio debe ser mayor a 0"
    );
  });

  test("debe establecer un descuento válido", () => {
    const product = new Product("Lechuga", 800, Categories.Vegetables);
    product.setDiscount(15);
    expect(product.getDiscount()).toBe(15);
  });

  test("debe lanzar error si el descuento no es un número entero", () => {
    const product = new Product("Lechuga", 800, Categories.Vegetables);
    expect(() => product.setDiscount("10")).toThrow(
      "El descuento debe ser un número entero entre 0 y 100"
    );
    expect(() => product.setDiscount(10.5)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100"
    );
  });

  test("debe lanzar error si el descuento está fuera de rango", () => {
    const product = new Product("Tomate", 600, Categories.Vegetables);
    expect(() => product.setDiscount(-1)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100"
    );
    expect(() => product.setDiscount(101)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100"
    );
  });

  test("toString debe mostrar el producto sin descuento", () => {
    const product = new Product("Manzana", 1500, Categories.Fruits);
    expect(product.toString()).toBe(
      "Producto: Manzana, Precio: 1500, Categoría: Frutas"
    );
  });

  test("toString debe mostrar el producto con descuento", () => {
    const product = new Product("Manzana", 1500, Categories.Fruits);
    product.setDiscount(20);
    expect(product.toString()).toBe(
      "Producto: Manzana, Precio: 1500, Categoría: Frutas, Descuento: 20%"
    );
  });

  test("las categorías deben estar definidas correctamente", () => {
    expect(Categories.Fruits).toBe("Frutas");
    expect(Categories.Vegetables).toBe("Verduras");
  });
});
