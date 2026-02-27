# Estado B – Solución con errores intencionales

Este estado corresponde a una implementación **más cercana al diseño esperado que el Estado A**, pensada para simular una entrega estudiantil "mejorada", pero que aún conserva **errores más sutiles** vinculados a Bootstrap y accesibilidad.  
La página **se visualiza correctamente** y evita varios problemas del Estado A, pero sigue presentando desajustes respecto a la consigna.

---

## Propósito del estado

Se utiliza como segunda entrada experimental para analizar:

- la capacidad de la IA para detectar errores **menos evidentes** en formularios y accesibilidad;
- la calidad de la retroalimentación cuando la página está "casi correcta";
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

---

## Mejoras respecto al Estado A

A diferencia del Estado A, este estado:

- agrega el campo de director y la casilla de verificación (checkbox);
- agrega `required` al campo de título;
- cambia el campo de año a `type="number"`;
- aplica `btn btn-success` al botón;
- aplica `form-control` y `form-label` a título y año;
- aumenta el padding del card a `p-3`;
- agrega `lang="es"` y un `<title>` descriptivo;
- asocia correctamente las etiquetas de título y año con sus inputs;
- cierra correctamente el `</div>` del contenedor.

---

## Errores intencionales incluidos

La solución sigue presentando inconsistencias deliberadas:

- el campo de año no tiene `min="1900"` ni `max="2025"` (validación de rango incompleta);
- el campo de director no tiene `id`, su etiqueta no tiene `for` → no están asociados;
- el campo de director no tiene clase `form-control`, su etiqueta no tiene `form-label`;
- el checkbox no tiene `id`, su etiqueta no tiene `for` → no están asociados;
- el checkbox no usa las clases Bootstrap `form-check-input` / `form-check-label` / `form-check`;
- la imagen sigue sin atributo `alt`;
- los problemas de contraste de color en CSS siguen presentes (labels y h2 con colores claros sobre fondo claro).

---

## Naturaleza de los errores

A diferencia del Estado A —donde faltaban elementos completos del formulario—, en este estado:

- los elementos **existen pero les falta configuración** (atributos, clases, asociaciones);
- los errores son **de completitud y accesibilidad**, no de estructura;
- la página puede parecer correcta visualmente para un estudiante que no verifica accesibilidad.
