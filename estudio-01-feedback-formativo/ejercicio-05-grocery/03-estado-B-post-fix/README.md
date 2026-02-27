# Estado B – Solución con errores intencionales

Este estado es una versión **mejorada** que resuelve los errores más graves del Estado A, pero conserva errores sutiles.

---

## Mejoras respecto al Estado A

- `discount` se inicializa en 0 en el constructor;
- `setDiscount` valida que no sea negativo;
- `toString()` muestra descuento solo cuando es mayor a 0;
- `totalDiscountedProducts()` filtra correctamente por descuento > 0;
- `addProduct()` acepta parámetro de descuento;
- tests mejorados: cubren casos de error del constructor y descuento negativo;
- UI: se agregó campo descuento y total de productos con descuento.

---

## Errores intencionales incluidos

- `setDiscount` no valida que el valor sea ≤ 100 ni que sea entero (acepta 150, 10.5);
- tests no cubren descuento > 100 ni no entero (ramas faltantes → cobertura < 100%);
- no se testea `totalDiscountedProducts` con almacén vacío;
- no se testea propagación de error de `Product` desde `addProduct`;
- la UI no implementa cards Bootstrap para frutas/verduras (siguen como lista).
