# Evaluación Docente — Tercera Revisión (Re-entrega) — Movie.EstadoC

---

## 1. Resumen

La entrega cumple **todos los requisitos de la consigna** en sus tres partes (formulario HTML, Bootstrap y accesibilidad). Todos los campos requeridos están presentes y correctamente configurados: título con `required`, año con `type="number"`, `min="1900"`, `max="2025"`, director con label e input asociados, y checkbox con las clases Bootstrap correspondientes. Las clases Bootstrap se aplican correctamente a todos los elementos (`form-control`, `form-label`, `form-check-input`, `form-check-label`, `btn btn-success`, `p-3`). La accesibilidad está resuelta: `lang="es"`, `<title>` descriptivo, todas las labels asociadas via `for`/`id`, imagen con `alt` descriptivo, y los colores de contraste corregidos en CSS (`#4a5520` para labels, `#3d6b1e` para h2 sobre fondo `#e2f0c6`). La estructura HTML está correctamente cerrada. **No se detectan errores críticos ni bloqueantes.**

**Aciertos nuevos concretos:**

1. Se completó la validación del año con `min="1900"` y `max="2025"`, y se asociaron correctamente director y checkbox con sus labels usando `for`/`id` y las clases Bootstrap correspondientes (`form-check` para el checkbox).
2. Se corrigieron los problemas de contraste de color en CSS, cambiando los colores de labels y h2 a valores que cumplen con WCAG 4.5:1, y se agregó `alt` descriptivo a la imagen.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

**No se detectan errores críticos.** La solución cumple todos los requisitos de la consigna en sus tres partes.

---

### MEJORAS (no bloqueantes)

---

#### M1 — Considerar agregar `aria-describedby` para mensajes de ayuda

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — campos de formulario |
| **Síntoma** | Los campos no tienen textos de ayuda que expliquen el formato esperado. |
| **Concepto** | **Accesibilidad avanzada / ARIA.** |
| **Explicación docente** | Bootstrap permite agregar `<div class="form-text">` con instrucciones (ej. "Ingresá un año entre 1900 y 2025") y vincularlos al input con `aria-describedby`. No es un requisito de la consigna, pero mejora la experiencia del usuario. |

---

#### M2 — Considerar agregar `placeholder` a los inputs

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — inputs de texto y número |
| **Síntoma** | Los inputs no tienen texto placeholder como guía visual. |
| **Concepto** | **UX / usabilidad.** |
| **Explicación docente** | Un `placeholder` (ej. "Ej: Inception") da una pista visual al usuario sobre qué completar. No reemplaza al `<label>` ni es un requisito de la consigna, pero mejora la usabilidad. |

---

#### M3 — La imagen podría tener `loading="lazy"` para performance

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` — `<img>` |
| **Concepto** | **Performance / lazy loading.** |
| **Explicación docente** | Si la imagen está debajo del pliegue visible, `loading="lazy"` difiere su carga hasta que el usuario la necesite. No es un requisito, pero es una buena práctica para performance web. |

---

## 3. Problemas previamente resueltos

| # | Concepto | Estado |
|---|---|---|
| 1 | Campo director con label e input | Correcto |
| 2 | Checkbox "Ya la vi" con label | Correcto |
| 3 | Título tiene `required` | Correcto |
| 4 | Año tiene `type="number"`, `min="1900"`, `max="2025"` | Correcto |
| 5 | Todas las labels asociadas via `for`/`id` (título, año, director, checkbox) | Correcto |
| 6 | Botón tiene `btn btn-success` | Correcto |
| 7 | Inputs de texto/número tienen `form-control` | Correcto |
| 8 | Labels tienen `form-label` (o `form-check-label` para checkbox) | Correcto |
| 9 | Checkbox usa `form-check-input` en contenedor `form-check` | Correcto |
| 10 | Padding del card es `p-3` | Correcto |
| 11 | `<html lang="es">` | Correcto |
| 12 | `<title>Registro de Película</title>` | Correcto |
| 13 | Imagen tiene `alt` descriptivo | Correcto |
| 14 | Contraste de colores corregido en CSS | Correcto |
| 15 | HTML correctamente cerrado (todos los `</div>`) | Correcto |
| 16 | Todos los inputs tienen `name` para envío | Correcto |

---

## 4. Preguntas guía para el estudiante

1. ¿Qué pasaría si intentaras enviar el formulario sin completar el título? ¿Quién bloquea el envío: el HTML o el servidor?

2. Si intentás ingresar año "1800", ¿qué hace el navegador? ¿Y si ingresás "abc" en un campo `type="number"`?

3. ¿Cuál es la diferencia entre `form-control` y `form-check-input` en Bootstrap? ¿Por qué no se usa la misma clase para checkboxes que para inputs de texto?

4. Si quisieras agregar un campo `<select>` con géneros de película (acción, comedia, drama), ¿qué clases Bootstrap le pondrías? ¿Necesitaría `for`/`id`?

5. ¿Qué herramienta usaste para verificar el contraste? ¿Cuál fue el ratio antes y después del cambio?

6. Si la imagen no cargara (URL rota), ¿qué vería el usuario en su lugar gracias al `alt`?

7. ¿Qué diferencia hay entre validación del lado del cliente (HTML/JS) y del lado del servidor? ¿Es suficiente con una?

8. ¿Qué pasaría si removieras el `lang="es"` ahora que todo funciona visualmente? ¿Quién se vería afectado?

---

## 5. Plan de próximos pasos (verificables)

1. Pasar la página por el validador W3C y verificar que no tenga errores de HTML.
2. Ejecutar WAVE Evaluation Tool y verificar que reporte 0 errores y 0 alertas de contraste.
3. **(Opcional)** Agregar `placeholder` a los inputs como guía visual (ej. "Ej: Inception", "Ej: 2010", "Ej: Christopher Nolan").
4. **(Opcional)** Agregar textos de ayuda con `<div class="form-text">` y `aria-describedby` para los campos que tienen restricciones (año).
5. **(Opcional)** Agregar `loading="lazy"` a la imagen.
6. **(Opcional)** Probar la navegación del formulario con el teclado (Tab) y verificar que todos los campos son accesibles y que el checkbox se puede activar con Space.
7. **(Opcional)** Agregar un campo `<select>` para género de película y verificar que Bootstrap lo estilice correctamente.
8. Investigar cómo agregar validación visual de Bootstrap (clases `is-valid` / `is-invalid`) para dar feedback al usuario después del envío.
9. Reflexionar: ¿qué pasaría si un usuario malintencionado modificara el HTML con DevTools y sacara el `required`? ¿Por qué la validación del lado del servidor también es necesaria?
10. Investigar ARIA roles y landmarks para mejorar la estructura semántica (ej. `<main>`, `<header>`).

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Campo director con label e input | BLOQUEANTE | OK |
| 2 | Checkbox con label | BLOQUEANTE | OK |
| 3 | Título tiene `required` | BLOQUEANTE | OK |
| 4 | Año tiene `type="number"`, `min="1900"`, `max="2025"` | BLOQUEANTE | OK |
| 5 | Todas las labels asociadas via `for`/`id` | BLOQUEANTE | OK |
| 6 | Botón tiene `btn btn-success` | BLOQUEANTE | OK |
| 7 | Inputs (excepto checkbox) tienen `form-control` | BLOQUEANTE | OK |
| 8 | Labels tienen `form-label` (o `form-check-label`) | BLOQUEANTE | OK |
| 9 | Checkbox usa `form-check-input`/`form-check-label`/`form-check` | BLOQUEANTE | OK |
| 10 | Padding del card es `p-3` | BLOQUEANTE | OK |
| 11 | `<html>` tiene `lang` | BLOQUEANTE | OK |
| 12 | `<title>` descriptivo | BLOQUEANTE | OK |
| 13 | Imagen tiene `alt` descriptivo | BLOQUEANTE | OK |
| 14 | Contraste cumple WCAG 4.5:1 | BLOQUEANTE | OK |
| 15 | HTML correctamente cerrado | BLOQUEANTE | OK |
| 16 | Todos los inputs tienen `name` | NO BLOQUEANTE | OK |
| 17 | HTML pasa validación W3C | NO BLOQUEANTE | Verificar |
| 18 | Apariencia consistente Bootstrap | NO BLOQUEANTE | OK |

---

**Valoración global: APROBADO — Todos los criterios cumplidos.**

La solución demuestra comprensión sólida de formularios HTML, validación nativa, clases Bootstrap para formularios, y accesibilidad web. Los tres aspectos de la consigna (formulario, Bootstrap, accesibilidad) están correctamente implementados. Las únicas observaciones son mejoras opcionales de UX y accesibilidad avanzada (placeholders, ARIA, lazy loading) que exceden el alcance de este ejercicio pero sirven como guía para seguir creciendo.
