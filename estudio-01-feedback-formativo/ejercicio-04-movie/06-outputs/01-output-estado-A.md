# Evaluación Docente — Movie.EstadoA

---

## 1. Resumen

La entrega muestra que el estudiante comprende la estructura básica de un formulario HTML con Bootstrap: usa correctamente `<!DOCTYPE html>`, incluye la referencia al CDN de Bootstrap, estructura el formulario dentro de un card con clases de layout (`container`, `card`, `mb-3`), y tiene dos campos con sus etiquetas. Sin embargo, faltan **elementos completos** requeridos por la consigna (campo director, checkbox), **no hay validación HTML** alguna (ni `required` ni restricciones numéricas), las **etiquetas no están asociadas** correctamente a sus inputs, no se aplican **clases Bootstrap** a inputs ni botón, y la **accesibilidad** tiene múltiples fallas (sin `lang`, `<title>` vacío, imagen sin `alt`, contraste insuficiente). Además, falta un `</div>` de cierre para el contenedor.

**Aciertos reales:**

1. La estructura general del HTML es correcta: `<!DOCTYPE html>`, `<head>` con meta charset y viewport, CDN de Bootstrap cargado, y el formulario organizado dentro de un card Bootstrap con clases de layout (`container mt-3`, `card`, `mb-3`).
2. Los dos campos existentes (título y año) tienen sus etiquetas `<label>` correspondientes, lo cual muestra intención de asociar label con input aunque la implementación tenga errores.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — Falta el campo de director

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — formulario |
| **Síntoma** | No existe ningún `<input>` ni `<label>` para el director de la película. |
| **Concepto** | **Cumplimiento de la consigna / elementos de formulario.** |
| **Por qué está mal** | La Parte A pide: "Incluir un campo con su etiqueta (label) que permita ingresar el director". Falta el campo completo. |
| **Pista** | Mirá los campos existentes (título, año). ¿Podés agregar uno más con la misma estructura (div + label + input)? |
| **Pregunta de chequeo** | Si alguien completa el formulario, ¿puede indicar quién dirigió la película? |

---

#### C2 — Falta la casilla de verificación (checkbox)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — formulario |
| **Síntoma** | No existe un `<input type="checkbox">` ni su etiqueta para "Ya la vi". |
| **Concepto** | **Elementos de formulario / checkbox.** |
| **Por qué está mal** | La Parte A pide: "Implementar casilla de verificación (checkbox) que indique si la película fue vista". |
| **Pista** | Investigá `<input type="checkbox">`. ¿Cómo se diferencia de un input de texto? ¿Necesita un label? |

---

#### C3 — El campo "Título" no es requerido

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<input type="text" name="title">` |
| **Síntoma** | El formulario se puede enviar sin completar el título. |
| **Concepto** | **Validación HTML nativa / atributo `required`.** |
| **Por qué está mal** | La consigna dice: "El campo Título es requerido". Sin `required`, el navegador no bloquea el envío con el campo vacío. |
| **Pista** | ¿Qué atributo HTML le indica al navegador que un campo es obligatorio? |

---

#### C4 — El campo "Año" no tiene validación numérica ni rango

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<input id="year" name="year">` |
| **Síntoma** | El campo acepta texto libre. Se puede ingresar "abc" o "9999". |
| **Concepto** | **Validación HTML / atributos `type`, `min`, `max`.** |
| **Por qué está mal** | La consigna dice: "Año de estreno debe aceptar solo números entre 1900 y 2025". Falta `type="number"`, `min="1900"` y `max="2025"`. |
| **Pista** | Investigá los atributos `type`, `min` y `max` de un `<input>`. ¿Qué tipo de input restringe a números? |

---

#### C5 — Label "Título" no está asociada al input (`for`/`id` desvinculados)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<label for="title">` y `<input ... name="title">` |
| **Síntoma** | La etiqueta tiene `for="title"` pero el input no tiene `id="title"`. El atributo `name` no establece la asociación; se necesita `id`. |
| **Concepto** | **Asociación semántica label/input / accesibilidad.** |
| **Por qué está mal** | Sin asociación, al hacer clic en la etiqueta no se activa el input, y los lectores de pantalla no pueden vincular el label con el campo. WAVE lo marca como error. |
| **Pista** | ¿Qué atributo del `<input>` debe coincidir con el `for` del `<label>`? ¿Es `name` o `id`? |

---

#### C6 — Label "Año" no tiene atributo `for`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<label>Año de estreno</label>` |
| **Síntoma** | La etiqueta no tiene `for` → no está asociada al input que sí tiene `id="year"`. |
| **Concepto** | **Asociación label/input.** |
| **Por qué está mal** | Mismo problema que C5. El input tiene `id="year"` pero el label no tiene `for="year"`. |
| **Pista** | El input ya tiene `id="year"`. ¿Qué le falta al label para completar la asociación? |

---

#### C7 — Botón sin clases Bootstrap

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<button type="submit">Registrar</button>` |
| **Síntoma** | El botón se muestra con estilo por defecto del navegador, sin estilizar con Bootstrap. |
| **Concepto** | **Clases Bootstrap / componentes de formulario.** |
| **Por qué está mal** | La Parte B pide: "Aplicar la clase `btn btn-success` al botón de envío". |
| **Pista** | ¿Qué atributo HTML usás para agregar clases CSS a un elemento? ¿Qué clases pide la consigna? |

---

#### C8 — Inputs sin `form-control` y labels sin `form-label`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — todos los inputs y labels |
| **Síntoma** | Los inputs no tienen el estilo de formulario Bootstrap (bordes, padding, ancho completo). |
| **Concepto** | **Clases Bootstrap para formularios.** |
| **Por qué está mal** | La Parte B pide: "Aplicar `form-control` a los inputs y `form-label` a las etiquetas". Sin estas clases, el formulario no tiene la apariencia estándar de Bootstrap. |
| **Pista** | Revisá la documentación de Bootstrap Forms. ¿Qué clases necesitan los `<input>` y los `<label>`? |

---

#### C9 — Padding del card es `p-1` en vez de `p-3`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<div class="card p-1">` |
| **Síntoma** | El contenido del card queda muy pegado a los bordes. |
| **Concepto** | **Clases de utilidad Bootstrap / spacing.** |
| **Por qué está mal** | La Parte B pide: "Aumentar el padding del card a `p-3`". |
| **Pista** | ¿Qué número aparece en la clase de padding? ¿Qué dice la consigna? |

---

#### C10 — Falta `lang` en `<html>`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<html>` |
| **Síntoma** | El elemento `<html>` no tiene atributo `lang`. |
| **Concepto** | **Accesibilidad / idioma de la página.** |
| **Por qué está mal** | Sin `lang`, los lectores de pantalla no saben en qué idioma leer el contenido. WAVE lo detecta como error. |
| **Pista** | ¿Qué atributo le indica al navegador y a los lectores de pantalla en qué idioma está la página? |

---

#### C11 — `<title>` vacío

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<title></title>` |
| **Síntoma** | La pestaña del navegador muestra la URL en vez de un título descriptivo. |
| **Concepto** | **Accesibilidad / SEO / semántica HTML.** |
| **Por qué está mal** | WAVE lo marca como error. El `<title>` es obligatorio y debe ser descriptivo para lectores de pantalla y para orientar al usuario. |
| **Pista** | ¿Qué texto pondrías para que alguien sepa de qué trata esta página solo leyendo el título de la pestaña? |

---

#### C12 — Imagen sin atributo `alt`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<img src="...">` |
| **Síntoma** | La imagen no tiene texto alternativo. |
| **Concepto** | **Accesibilidad / atributo `alt`.** |
| **Por qué está mal** | Sin `alt`, los lectores de pantalla no pueden describir la imagen, y si la imagen no carga, no hay texto de reemplazo. WAVE lo marca como error crítico. |
| **Pista** | ¿Qué atributo describe el contenido de una imagen para quienes no pueden verla? |

---

#### C13 — Contraste insuficiente en labels y h2

| Aspecto | Detalle |
|---|---|
| **Dónde** | `styles.css` — `label { color: #afbf82; }` y `h2 { color: #a1c676; }` |
| **Síntoma** | Las etiquetas y el título se ven con colores claros sobre el fondo claro del card (`#e2f0c6`). Cuesta leerlos. |
| **Concepto** | **Accesibilidad / contraste WCAG.** |
| **Por qué está mal** | WCAG 2.1 requiere un ratio de contraste mínimo de 4.5:1 para texto normal. Los colores actuales no cumplen. WAVE lo detecta como error de contraste. |
| **Pista** | Usá una herramienta de contraste (ej. WebAIM Contrast Checker) para verificar los ratios. ¿Necesitás colores más oscuros o más claros? |

---

#### C14 — Falta `</div>` de cierre para el contenedor

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<div class="container mt-3">` |
| **Síntoma** | El `<div class="container">` se abre pero nunca se cierra. |
| **Concepto** | **Estructura HTML / anidamiento correcto.** |
| **Por qué está mal** | Un `</div>` faltante puede causar problemas de layout. El HTML queda mal formado. |
| **Pista** | Contá los `<div>` de apertura y los `</div>` de cierre. ¿Coinciden? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — El input de año no tiene atributo `type` explícito

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<input id="year" name="year">` |
| **Síntoma** | Sin `type`, el navegador lo trata como `type="text"` por defecto. |
| **Por qué importa** | Aunque se corregirá con `type="number"` por la validación, es buena práctica siempre declarar el tipo explícitamente. |

---

## 3. Preguntas guía para el estudiante

1. ¿Qué diferencia hay entre los atributos `name` e `id` de un `<input>`? ¿Cuál necesita el `<label>` para asociarse?

2. ¿Qué atributo HTML hace que un campo sea obligatorio para el envío del formulario? ¿Quién valida: el navegador o el servidor?

3. Si querés que un campo solo acepte números entre 1900 y 2025, ¿qué atributos necesitás combinar en el `<input>`?

4. ¿Qué pasa cuando un lector de pantalla encuentra un `<img>` sin atributo `alt`? ¿Y si el `<title>` está vacío?

5. ¿Por qué importa el contraste de color? Si un texto es verde claro sobre fondo verde claro, ¿quién tiene dificultad para leerlo?

6. ¿Qué clases de Bootstrap necesita un `<input>` de formulario para verse estilizado correctamente? ¿Y un `<label>`?

7. ¿Qué diferencia hay entre un `<input type="text">` y un `<input type="checkbox">`? ¿Necesitan las mismas clases Bootstrap?

8. Si contás los `<div>` de apertura y los `</div>` de cierre, ¿coinciden? ¿Qué herramienta te ayuda a detectar tags sin cerrar?

9. ¿Qué le comunica `lang="es"` al navegador y a las herramientas de accesibilidad? ¿Qué pasa si no está?

10. ¿Qué herramienta podrías usar para verificar que los colores de tu CSS cumplen con las pautas de contraste WCAG?

---

## 4. Plan de próximos pasos (verificables)

1. Agregar `lang="es"` al tag `<html>`.
2. Escribir un texto descriptivo dentro de `<title>` (ej. "Registro de Película").
3. Agregar `id="title"` al input de título para que coincida con `for="title"` del label.
4. Agregar `for="year"` al label del año para que coincida con `id="year"` del input.
5. Agregar `required` al input de título.
6. Cambiar el input de año a `type="number"` y agregar `min="1900"` y `max="2025"`.
7. Agregar un campo de director: `<label for="director">` + `<input type="text" id="director">`.
8. Agregar un checkbox: `<input type="checkbox" id="watched">` + `<label for="watched">Ya la vi</label>`.
9. Agregar `class="btn btn-success"` al botón.
10. Agregar `class="form-control"` a los inputs de texto/number y `class="form-label"` a sus labels.
11. Para el checkbox, usar `form-check-input`, `form-check-label` y contenedor `form-check`.
12. Cambiar `p-1` por `p-3` en el card.
13. Agregar `alt="..."` descriptivo a la imagen.
14. En `styles.css`, cambiar los colores de `label` y `h2` a valores con contraste suficiente (ratio ≥ 4.5:1).
15. Agregar el `</div>` faltante para cerrar el contenedor.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad |
|---|---|---|
| 1 | Existe el campo de director con label e input | BLOQUEANTE |
| 2 | Existe el checkbox "ya la vi" con label | BLOQUEANTE |
| 3 | Campo título tiene atributo `required` | BLOQUEANTE |
| 4 | Campo año tiene `type="number"`, `min="1900"`, `max="2025"` | BLOQUEANTE |
| 5 | Cada `<label>` está asociada a su `<input>` via `for`/`id` | BLOQUEANTE |
| 6 | Botón tiene clases `btn btn-success` | BLOQUEANTE |
| 7 | Inputs (excepto checkbox) tienen clase `form-control` | BLOQUEANTE |
| 8 | Labels tienen clase `form-label` (o `form-check-label` para checkbox) | BLOQUEANTE |
| 9 | Checkbox usa `form-check-input` y contenedor `form-check` | BLOQUEANTE |
| 10 | Padding del card es `p-3` | BLOQUEANTE |
| 11 | `<html>` tiene atributo `lang` | BLOQUEANTE |
| 12 | `<title>` tiene texto descriptivo | BLOQUEANTE |
| 13 | Imagen tiene atributo `alt` descriptivo | BLOQUEANTE |
| 14 | Contraste de colores cumple WCAG 4.5:1 | BLOQUEANTE |
| 15 | Todos los tags HTML están correctamente cerrados | BLOQUEANTE |
| 16 | Los campos tienen atributo `name` para envío de formulario | NO BLOQUEANTE |
| 17 | El HTML pasa validación W3C sin errores | NO BLOQUEANTE |
| 18 | El formulario tiene apariencia consistente con Bootstrap | NO BLOQUEANTE |
