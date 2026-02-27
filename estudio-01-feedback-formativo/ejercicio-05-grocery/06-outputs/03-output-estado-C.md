# Evaluación Docente — Grocery.EstadoC

---

## 1. Resumen

La entrega cumple con la totalidad de los requisitos de la consigna. La clase `Product` inicializa `#discount` en 0 y valida correctamente en `setDiscount()` que el valor sea entero y esté entre 0 y 100, lanzando `Error` con mensajes descriptivos para cada caso. `toString()` muestra el descuento solo cuando es mayor a 0. `totalDiscountedProducts()` usa `filter` para contar correctamente los productos con descuento. `addProduct()` acepta un parámetro opcional `discount`. Los tests unitarios cubren exhaustivamente los happy paths y todos los casos de error, incluyendo edge cases (nombre solo espacios, precio 0, descuento en los límites 0 y 100, descuento 101, no entero). Los tests de `Grocery` verifican almacén vacío, propagación de errores, copia de array, y combinaciones de productos con/sin descuento. La interfaz incluye campo de descuento, total con descuento, y cards Bootstrap con nombre, precio y descuento para Frutas y Verduras. Es un trabajo completo y bien estructurado.

**Aciertos reales:**

1. La validación en `setDiscount()` es ejemplar: primero verifica tipo (`Number.isInteger`), luego rango (0–100), con mensajes de error distintos y descriptivos para cada caso. Esto es programación defensiva bien aplicada.
2. Los tests unitarios demuestran comprensión profunda del testing: cubren boundaries (0, 100), tipos inválidos (10.5), rangos inválidos (-1, 101), edge cases de strings (nombre vacío, solo espacios), propagación de errores desde Grocery, y verificación de encapsulación (copia de array). La cobertura de branches debería ser 100%.
3. El uso de cards Bootstrap en la interfaz con creación dinámica mediante `createProductCard()` demuestra capacidad de integrar lógica de dominio con componentes de UI modernos.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

No se detectaron errores bloqueantes. La solución cumple con todos los requisitos de la consigna.

---

### MEJORAS (no bloqueantes)

---

#### M1 — Se podría agregar test para `addProduct` con descuento 0 explícito

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/grocery.test.js` |
| **Síntoma** | Se testea `addProduct` sin descuento y con descuento 20, pero no con descuento explícito 0. |
| **Concepto** | **Edge case / branch del `if (discount > 0)`.** |
| **Por qué importa** | Pasar `discount = 0` explícitamente activa el branch `if (discount > 0)` por su rama `false`, lo cual puede ser relevante para confirmar que no se llama a `setDiscount(0)` innecesariamente. Es un caso de borde menor pero relevante para cobertura exhaustiva. |
| **Pista** | ¿Qué pasa si llamás `addProduct("Manzana", 100, "Frutas", 0)`? ¿Se ejecuta `setDiscount`? |

---

#### M2 — Cards podrían mostrar "Sin descuento" en tono más sutil

| Aspecto | Detalle |
|---|---|
| **Dónde** | `main.js` — función `createProductCard` |
| **Síntoma** | Cuando un producto no tiene descuento, el card muestra el texto "Sin descuento". |
| **Concepto** | **UX / diseño de interfaz.** |
| **Por qué importa** | Es una decisión de diseño válida, pero podría usarse una clase Bootstrap como `text-muted` para diferenciar visualmente la ausencia de descuento. Es puramente estético. |

---

#### M3 — Se podría verificar con tests de integración que `main.js` interactúa correctamente con el DOM

| Aspecto | Detalle |
|---|---|
| **Dónde** | `main.js` |
| **Síntoma** | No hay tests de integración para la interfaz de usuario. |
| **Concepto** | **Testing de integración / DOM testing.** |
| **Por qué importa** | Si bien la consigna pide tests unitarios para las clases de dominio (y esos están completos), tests de integración con el DOM (usando jsdom o similar) asegurarían que el flujo completo funciona. Esto está fuera del alcance de la consigna pero sería un buen ejercicio avanzado. |

---

## 3. Preguntas guía para el estudiante

1. ¿Por qué separaste la validación de "entero" y la de "rango" en dos `if` distintos en `setDiscount()`? ¿Qué ventaja tiene tener mensajes de error diferentes?

2. En tu test de `getProducts`, ¿por qué es importante verificar que `push` en la copia no afecta al original? ¿Qué concepto de POO se está verificando?

3. ¿Qué pasaría si `addProduct` no tuviera el `if (discount > 0)` y siempre llamara a `setDiscount(discount)`? ¿Funcionaría igual?

4. ¿Cuántos tests unitarios escribiste en total? ¿Podés identificar cuál cubre cada branch de tu código?

5. ¿Cómo podrías verificar la cobertura de tests sin ejecutarlos manualmente? ¿Qué herramienta usarías?

6. Si quisieras agregar una función `averageDiscount()` en `Grocery`, ¿qué tests escribirías? ¿Qué edge cases considerarías?

---

## 4. Plan de próximos pasos (verificables)

1. Ejecutar `npm test -- --coverage` y verificar 100% de sentencias y branches.
2. Ejecutar `npm run lint` y verificar 0 errores y 0 warnings.
3. Considerar agregar test para `addProduct` con `discount = 0` explícito.
4. Considerar agregar clase `text-muted` en los cards para productos sin descuento.
5. Considerar agregar atributos `aria-label` en los cards para mejorar accesibilidad.
6. Considerar tests de integración con jsdom para verificar el flujo completo formulario → dominio → UI.
7. Revisar si la función `clearInputs()` debería también resetear el select de categoría.
8. Documentar las decisiones de diseño (ej. "Sin descuento" vs ocultar campo) si el proyecto crece.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado |
|---|---|---|---|
| 1 | `#discount` se inicializa a 0 en el constructor | BLOQUEANTE | OK |
| 2 | `setDiscount` valida que el valor sea entero | BLOQUEANTE | OK |
| 3 | `setDiscount` valida rango 0–100 y lanza `Error` | BLOQUEANTE | OK |
| 4 | `getDiscount` retorna el valor correcto | BLOQUEANTE | OK |
| 5 | `toString()` muestra descuento solo si > 0 | BLOQUEANTE | OK |
| 6 | `totalDiscountedProducts()` filtra por descuento > 0 | BLOQUEANTE | OK |
| 7 | `addProduct()` acepta parámetro de descuento | BLOQUEANTE | OK |
| 8 | Tests cubren `setDiscount` con valores válidos e inválidos | BLOQUEANTE | OK |
| 9 | Tests cubren `toString` con y sin descuento | BLOQUEANTE | OK |
| 10 | Tests cubren `totalDiscountedProducts` con y sin descuentos | BLOQUEANTE | OK |
| 11 | Tests cubren constructor de `Product` con datos inválidos | BLOQUEANTE | OK |
| 12 | Tests verifican que `getProducts` retorna copia | BLOQUEANTE | OK |
| 13 | Cobertura de tests alcanza 100% de sentencias y ramas | BLOQUEANTE | OK (verificar ejecutando) |
| 14 | UI: campo descuento en formulario con `type="number"`, `min`, `max` | BLOQUEANTE | OK |
| 15 | UI: "Total productos con descuento" en panel Inicio | BLOQUEANTE | OK |
| 16 | UI: cards Bootstrap en paneles Frutas y Verduras | BLOQUEANTE | OK |
| 17 | `main.js` integra correctamente descuento en `addProduct` | BLOQUEANTE | OK |
| 18 | Tests tienen nombres descriptivos | NO BLOQUEANTE | OK |
| 19 | Mensajes de error de validación son claros y descriptivos | NO BLOQUEANTE | OK |
| 20 | El linter no reporta errores ni warnings | NO BLOQUEANTE | Verificar |
