# Estado A – Solución con errores intencionales

Este estado corresponde a la implementación **inicial** del formulario, con múltiples problemas de formulario HTML, Bootstrap y accesibilidad.

## Propósito del estado

Se utiliza como entrada del experimento baseline para analizar:

- la capacidad de la IA para detectar fallas en formularios HTML, estilos Bootstrap y accesibilidad;
- la calidad de la retroalimentación formativa generada;
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

## Errores intencionales incluidos

La página se visualiza en el navegador, pero presenta inconsistencias respecto a la consigna y a las buenas prácticas web.  
Entre los errores introducidos deliberadamente se encuentran:

- falta el campo de director de la película;
- falta la casilla de verificación (checkbox) de "película vista";
- el campo "Título" no tiene atributo `required`;
- el campo "Año de estreno" no tiene `type="number"` ni atributos `min`/`max`;
- la etiqueta del título tiene `for="title"` pero el input no tiene `id="title"` → no están asociados;
- la etiqueta del año no tiene atributo `for` → no está asociada al input;
- el botón no tiene clases Bootstrap (`btn btn-success`);
- los inputs no tienen `form-control` y las etiquetas no tienen `form-label`;
- el padding del card es `p-1` en vez de `p-3`;
- la imagen no tiene atributo `alt`;
- falta el atributo `lang` en `<html>`;
- el `<title>` está vacío;
- hay problemas de contraste de color en labels y h2 (colores claros sobre fondo claro);
- falta un `</div>` de cierre para el contenedor.
