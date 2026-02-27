# Consigna – Sistema de Almacén (Grocery)

## Enunciado

Dado un proyecto JavaScript con una aplicación de almacén que ya tiene una clase `Product`, una clase `Grocery` y una interfaz HTML con Bootstrap, realizar las siguientes mejoras:

### Parte A: Lógica de dominio y tests

1) En la clase `Product` agregar el campo `discount`:
   - El campo es un **número entero**, mínimo 0 y máximo 100.
   - Implementar `getDiscount()` y `setDiscount(discount)` validando que el valor recibido sea válido (entero, entre 0 y 100). Lanzar `Error` si no es válido.
   - El descuento se inicializa en 0 por defecto.

2) Modificar `toString()` para que muestre el descuento **solo si es mayor a cero**.

3) Codificar **tests unitarios** para las nuevas funciones:
   - Incluir tests para casos de error (valores inválidos).
   - La cobertura debe alcanzar **100% de sentencias y ramas**.

4) En la clase `Grocery`, implementar `totalDiscountedProducts()` que retorna el total de productos **con descuento mayor a 0**.

5) Modificar `addProduct()` para aceptar un parámetro opcional `discount`.

6) Codificar tests unitarios para `totalDiscountedProducts()` y la modificación de `addProduct()`.

### Parte B: Interfaz de usuario

7) Agregar campo **"Descuento"** en el formulario "Nuevo producto" (`type="number"`, `min="0"`, `max="100"`).

8) Mostrar **"Total productos con descuento"** en el panel "Inicio".

9) Usar el componente **card** de Bootstrap para mostrar los productos en los paneles "Frutas" y "Verduras":
   - Nombre del producto como título del card.
   - Precio y descuento en el cuerpo del card.

## Observación didáctica

La consigna busca evaluar especialmente:

- diseño de clases con encapsulación (campos privados, getters/setters),
- validación de datos en setters (programación defensiva),
- testing unitario con cobertura completa (sentencias y ramas),
- uso de colecciones con filtrado (`filter`),
- modularización (imports/exports),
- integración entre lógica de dominio e interfaz de usuario,
- uso de componentes Bootstrap (cards).
