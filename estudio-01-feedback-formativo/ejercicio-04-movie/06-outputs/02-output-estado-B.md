# Evaluación Docente — Segunda Revisión (Re-entrega) — Movie.EstadoB

---

## 1. Resumen

La re-entrega muestra un **avance significativo** respecto de la versión anterior. El estudiante agregó los dos campos faltantes (director y checkbox), implementó `required` en el título, cambió el año a `type="number"`, aplicó `btn btn-success` al botón, agregó clases Bootstrap (`form-control`, `form-label`) a los campos de título y año, corrigió el padding a `p-3`, agregó `lang="es"` y un `<title>` descriptivo, asoció correctamente las labels de título y año, y cerró el `</div>` faltante. Sin embargo, persisten problemas: el campo de año **no tiene `min`/`max`**, el campo de director **no tiene asociación label/input ni clases Bootstrap**, el checkbox **no tiene asociación ni clases Bootstrap**, la imagen **sigue sin `alt`**, y los **problemas de contraste de color** en CSS siguen presentes.

**Aciertos nuevos concretos:**

1. Se agregaron el campo de director y el checkbox, cumpliendo con los elementos requeridos de la Parte A. La asociación `for`/`id` de título y año ahora es correcta.
2. Se aplicaron correctamente `btn btn-success`, `form-control` y `form-label` a los campos de título y año, y se corrigió el padding a `p-3`. El formulario se ve bien estilizado en esos campos.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — El campo "Año" no tiene `min` ni `max`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<input type="number" id="year" name="year" class="form-control">` |
| **Síntoma** | El campo acepta `type="number"` (bien), pero sin `min` ni `max`, acepta cualquier número (ej. -500 o 99999). |
| **Concepto** | **Validación HTML / restricción de rango.** |
| **Explicación docente** | La consigna pide: "números entre 1900 y 2025". Falta agregar `min="1900"` y `max="2025"` para que el navegador restrinja el rango al enviar el formulario. El `type="number"` solo restringe a números, no al rango. |
| **Pista** | Ya tenés `type="number"`. ¿Qué dos atributos más necesitás para definir el rango permitido? |
| **Pregunta de chequeo** | Si alguien ingresa año "1800" o "3000", ¿el navegador lo bloquea al enviar? |

---

#### C2 — Label de director no asociada al input

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<label>Director</label>` y `<input type="text" name="director">` |
| **Síntoma** | El label no tiene `for` y el input no tiene `id`. No están vinculados. |
| **Concepto** | **Asociación label/input / accesibilidad.** |
| **Explicación docente** | Ya hiciste la asociación correcta para título (`for="title"` / `id="title"`) y año (`for="year"` / `id="year"`). Falta hacer lo mismo para director. Sin asociación, al hacer clic en "Director" no se activa el input, y los lectores de pantalla no lo vinculan. |
| **Pista** | Mirá cómo asociaste título y año. ¿Podés aplicar el mismo patrón al campo de director? |

---

#### C3 — Campo de director sin clases Bootstrap

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — label y input del director |
| **Síntoma** | El input del director no tiene `form-control` y el label no tiene `form-label`. Se ve distinto a los otros campos. |
| **Concepto** | **Consistencia de estilos Bootstrap.** |
| **Explicación docente** | Ya aplicaste las clases a título y año. El campo de director queda visualmente inconsistente sin ellas. |
| **Pista** | Compará el HTML del campo de título con el del director. ¿Qué clases tiene uno que le faltan al otro? |

---

#### C4 — Checkbox sin asociación label/input

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<input type="checkbox" name="watched">` y `<label>Ya la vi</label>` |
| **Síntoma** | El checkbox no tiene `id` y el label no tiene `for`. No están asociados. |
| **Concepto** | **Asociación label/input para checkbox.** |
| **Explicación docente** | La asociación es especialmente importante para checkboxes: permite hacer clic en el texto "Ya la vi" para activar/desactivar la casilla, además del beneficio de accesibilidad. |
| **Pista** | Mismo patrón que los otros campos: agregá `id` al input y `for` al label. |

---

#### C5 — Checkbox sin clases Bootstrap

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — checkbox y su label |
| **Síntoma** | El checkbox se ve con estilo por defecto del navegador, no con estilo Bootstrap. |
| **Concepto** | **Clases Bootstrap para checkboxes.** |
| **Explicación docente** | Los checkboxes en Bootstrap usan clases diferentes a los inputs de texto: `form-check-input` en el input, `form-check-label` en el label, y el contenedor necesita `form-check`. |
| **Pista** | Revisá la documentación de Bootstrap > Forms > Checks. ¿Qué clases necesita un checkbox? ¿Son las mismas que un input de texto? |

---

#### C6 — Imagen sin atributo `alt`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<img src="...">` |
| **Síntoma** | La imagen no tiene texto alternativo. |
| **Concepto** | **Accesibilidad / atributo `alt`.** |
| **Explicación docente** | WAVE lo marca como error crítico. Sin `alt`, los lectores de pantalla no pueden describir la imagen. |
| **Pista** | ¿Qué describe la imagen? Escribí un texto breve que transmita la misma información que la imagen. |

---

#### C7 — Contraste insuficiente en labels y h2

| Aspecto | Detalle |
|---|---|
| **Dónde** | `styles.css` — `label { color: #afbf82; }` y `h2 { color: #a1c676; }` |
| **Síntoma** | Las etiquetas y el título tienen colores claros sobre fondo claro (`#e2f0c6`). Dificultan la lectura. |
| **Concepto** | **Accesibilidad / contraste WCAG.** |
| **Explicación docente** | El ratio de contraste entre `#afbf82` y `#e2f0c6` está muy por debajo de 4.5:1. WAVE lo detecta como error de contraste. Necesitás colores más oscuros para las etiquetas y el título. |
| **Pista** | Usá WebAIM Contrast Checker para probar combinaciones de colores hasta alcanzar un ratio ≥ 4.5:1 sobre el fondo `#e2f0c6`. |

---

### MEJORAS (no bloqueantes)

---

#### M1 — El campo de director no tiene atributo `name` necesario para envío

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — input del director (ya tiene `name="director"`) |
| **Síntoma** | En realidad sí tiene `name`. Acierto. |

*(Sin mejoras adicionales no bloqueantes significativas en esta entrega.)*

---

## 3. Problemas previamente resueltos

| # | Problema anterior | Estado actual |
|---|---|---|
| 1 | Faltaba campo de director | Agregado (falta asociación y Bootstrap) |
| 2 | Faltaba checkbox | Agregado (falta asociación y Bootstrap) |
| 3 | Título sin `required` | Ahora tiene `required` |
| 4 | Año sin `type="number"` | Ahora tiene `type="number"` |
| 5 | Label título sin asociar (`for`/`id`) | Ahora correctamente asociada |
| 6 | Label año sin `for` | Ahora tiene `for="year"` |
| 7 | Botón sin clases Bootstrap | Ahora tiene `btn btn-success` |
| 8 | Inputs de título y año sin `form-control` | Ahora tienen `form-control` |
| 9 | Labels de título y año sin `form-label` | Ahora tienen `form-label` |
| 10 | Padding `p-1` | Ahora es `p-3` |
| 11 | Falta `lang` en `<html>` | Ahora tiene `lang="es"` |
| 12 | `<title>` vacío | Ahora tiene "Registro de Película" |
| 13 | `</div>` faltante | Ahora correctamente cerrado |

**Progreso significativo.** La mayoría de los problemas estructurales y de formulario están resueltos. Los pendientes son de completitud (aplicar el mismo patrón de asociación y Bootstrap a los nuevos campos) y de accesibilidad (alt, contraste).

---

## 4. Preguntas guía para el estudiante

1. Ya asociaste correctamente las labels de título y año. ¿Por qué no aplicaste el mismo patrón (`for`/`id`) al campo de director y al checkbox?

2. ¿Cuál es la diferencia entre `form-control` (para inputs de texto) y `form-check-input` (para checkboxes) en Bootstrap? ¿Por qué son clases diferentes?

3. `type="number"` restringe a números, pero sin `min` y `max`, ¿qué valores acepta? ¿Tiene sentido un año de estreno de -500?

4. Si una persona ciega usa un lector de pantalla y llega a tu imagen, ¿qué escucha? ¿Qué debería escuchar?

5. ¿Cómo verificás si los colores de tu CSS tienen suficiente contraste? ¿Qué herramienta podrías usar?

6. Si hacés clic en el texto "Ya la vi", ¿se activa el checkbox? ¿Por qué sí o por qué no?

7. Compará visualmente el campo de director con el de título. ¿Se ven iguales? ¿Qué les falta?

8. ¿Qué ratio de contraste mínimo exigen las pautas WCAG para texto normal?

---

## 5. Plan de próximos pasos (verificables)

1. Agregar `min="1900"` y `max="2025"` al input de año.
2. Agregar `id="director"` al input del director y `for="director"` a su label.
3. Agregar `class="form-control"` al input del director y `class="form-label"` a su label.
4. Agregar `id="watched"` al checkbox y `for="watched"` a su label.
5. Cambiar las clases del checkbox: `form-check-input` al input, `form-check-label` al label, y envolver en un div con `form-check`.
6. Agregar `alt="..."` descriptivo a la imagen.
7. En `styles.css`, cambiar `label { color: #afbf82; }` por un color más oscuro (ej. `#4a5520`) que cumpla contraste ≥ 4.5:1 sobre `#e2f0c6`.
8. En `styles.css`, cambiar `h2 { color: #a1c676; }` por un color más oscuro (ej. `#3d6b1e`).
9. Verificar con WAVE Evaluation Tool que no queden errores ni alertas de contraste.
10. Verificar que todos los labels activan su input al hacer clic.

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Campo director con label e input | BLOQUEANTE | OK (falta asociación y Bootstrap) |
| 2 | Checkbox con label | BLOQUEANTE | OK (falta asociación y Bootstrap) |
| 3 | Título tiene `required` | BLOQUEANTE | OK |
| 4 | Año tiene `type="number"`, `min="1900"`, `max="2025"` | BLOQUEANTE | Parcial (falta min/max) |
| 5 | Todas las labels asociadas via `for`/`id` | BLOQUEANTE | Parcial (título y año OK) |
| 6 | Botón tiene `btn btn-success` | BLOQUEANTE | OK |
| 7 | Inputs (excepto checkbox) tienen `form-control` | BLOQUEANTE | Parcial (falta director) |
| 8 | Labels tienen `form-label` | BLOQUEANTE | Parcial (falta director) |
| 9 | Checkbox usa `form-check-input`/`form-check-label`/`form-check` | BLOQUEANTE | Pendiente |
| 10 | Padding del card es `p-3` | BLOQUEANTE | OK |
| 11 | `<html>` tiene `lang` | BLOQUEANTE | OK |
| 12 | `<title>` descriptivo | BLOQUEANTE | OK |
| 13 | Imagen tiene `alt` | BLOQUEANTE | Pendiente |
| 14 | Contraste cumple WCAG 4.5:1 | BLOQUEANTE | Pendiente |
| 15 | HTML correctamente cerrado | BLOQUEANTE | OK |
| 16 | Todos los inputs tienen `name` | NO BLOQUEANTE | OK |
| 17 | HTML pasa validación W3C | NO BLOQUEANTE | Verificar |
| 18 | Apariencia consistente Bootstrap | NO BLOQUEANTE | Parcial |

---

**Valoración global:** Progreso claro. Los elementos de formulario existen, la validación del título funciona, la estructura HTML está corregida, y Bootstrap se aplica parcialmente. Los puntos pendientes son: completar la validación del año (min/max), aplicar el mismo patrón de asociación y Bootstrap a director y checkbox, agregar alt a la imagen, y corregir el contraste de colores.
