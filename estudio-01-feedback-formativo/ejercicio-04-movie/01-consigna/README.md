# Consigna – Registro de Película (Movie)

## Enunciado

Dado un formulario HTML básico de registro de películas que utiliza Bootstrap, realizar las siguientes mejoras:

### Parte A: Ajustes en Formulario HTML

1) Incluir un campo con su etiqueta (`label`) que permita ingresar el **director** de la película.
2) Implementar una casilla de verificación (`checkbox`) que indique si la película fue vista por el usuario.
3) Implementar validación de datos con HTML:
   - El campo "Título de la película" es **requerido**.
   - El campo "Año de estreno" debe aceptar solo **números entre 1900 y 2025**.

### Parte B: Bootstrap

4) Aplicar la clase `btn btn-success` al botón de envío del formulario.
5) Aplicar la clase `form-control` a los inputs del formulario (excepto al de tipo `checkbox`), y la clase `form-label` a las etiquetas correspondientes a cada input.
6) Para el checkbox, usar las clases `form-check-input` y `form-check-label` de Bootstrap, envueltos en un contenedor con clase `form-check`.
7) Aumentar el padding del card Bootstrap del formulario a `p-3`.

### Parte C: Accesibilidad

8) Agregar atributo `lang="es"` al elemento `<html>`.
9) Agregar un `<title>` descriptivo a la página.
10) Asociar correctamente cada `<label>` con su `<input>` mediante atributos `for` e `id`.
11) Agregar atributo `alt` descriptivo a la imagen.
12) Corregir problemas de contraste de color en etiquetas (`label`) y encabezados (`h2`) modificando la hoja de estilos CSS.
13) Cerrar correctamente todos los elementos HTML (verificar `</div>` faltantes).

## Observación didáctica

La consigna busca evaluar especialmente:

- uso correcto de elementos de formulario HTML (`label`, `input`, `checkbox`),
- asociación semántica entre etiquetas e inputs (`for`/`id`),
- validación de datos con atributos HTML nativos (`required`, `type`, `min`, `max`),
- aplicación de clases Bootstrap a componentes de formulario,
- accesibilidad web (atributos `lang`, `alt`, `title`, contraste de color),
- estructura HTML correcta (cierre de tags, semántica).
