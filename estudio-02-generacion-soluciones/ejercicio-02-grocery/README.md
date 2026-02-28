# Consigna — Grocery

## Objetivos

- Implementar nuevas funciones de lógica de dominio.
- Codificar test unitarios en paralelo a la implementación.
- Usar buenas prácticas de codificación.
- Modificar la interfaz de usuario para usar las nuevas funciones.

## Aspectos a tener en cuenta

- Los test unitarios se deben codificar en los archivos correspondientes `*.test.js`.
- La cobertura de los test unitarios debe alcanzar 100% de sentencias y ramas.

## Parte A

- En la clase `Product` agregar el campo `discount`.
  - El campo es un número entero, mínimo 0 y máximo 100.
- Implementar las funciones `getDiscount()` y `setDiscount()` validando que el valor recibido es válido.
- Modificar la función `toString()` mostrando el descuento si es mayor a cero.
- Codificar test unitarios para las nuevas funciones (incluir test para casos de error).
- En la clase `Grocery` implementar la función `totalDiscountedProducts()` que retorna el total de productos con descuento del almacén.
- Codificar test unitarios para la función `totalDiscountedProducts()`.

## Parte B

- Agregar elementos a la interfaz de usuario para usar las nuevas funciones:
  - Campo 'Descuento' en el formulario 'Nuevo producto'.
  - Mostrar 'Total productos con descuento' en el panel 'Inicio'.
- Usar el componente card de Bootstrap para mostrar los productos en los paneles 'Frutas' y 'Verduras':
  - Usar el nombre del producto como título en cada card.
  - En el cuerpo del card mostrar: precio, descuento.
