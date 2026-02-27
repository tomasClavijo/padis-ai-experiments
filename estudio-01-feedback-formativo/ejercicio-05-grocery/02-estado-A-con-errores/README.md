# Estado A – Solución con errores intencionales

Este estado corresponde a una implementación **parcialmente correcta** con errores frecuentes en validación, testing y lógica de dominio.

## Errores intencionales incluidos

- `discount` no se inicializa en el constructor (queda `undefined`);
- `setDiscount()` no tiene ninguna validación;
- `toString()` muestra el descuento siempre (incluso cuando es `undefined` o 0);
- `totalDiscountedProducts()` retorna el total de productos (no solo los que tienen descuento);
- `addProduct()` no acepta parámetro de descuento;
- los tests no cubren casos de error ni ramas condicionales;
- un test tiene una aserción incorrecta (espera valor equivocado);
- la interfaz no se modificó (faltan campo descuento, total con descuento y cards Bootstrap).
