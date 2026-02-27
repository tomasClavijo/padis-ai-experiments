# Evaluación Docente — Grocery.EstadoB

---

## 1. Resumen

La entrega muestra una mejora significativa respecto al estado anterior. El campo `#discount` se inicializa correctamente en 0 en el constructor, `setDiscount()` tiene validación parcial (rechaza negativos), `toString()` ahora muestra el descuento solo cuando es mayor a 0, y `totalDiscountedProducts()` filtra correctamente por descuento. `addProduct()` acepta el parámetro `discount`. La interfaz se mejoró: se agregó campo de descuento en el formulario y total de productos con descuento en el panel Inicio. Los tests son más completos e incluyen algunos casos de error. Sin embargo, `setDiscount()` **no valida el límite superior (> 100) ni que sea entero** (acepta 150, 10.5), los tests **no cubren esos branches faltantes**, y la interfaz **no implementa cards Bootstrap** para Frutas y Verduras (siguen como listas `<ul>/<li>`).

**Aciertos reales:**

1. La inicialización de `#discount = 0` en el constructor y la condición en `toString()` son correctas y coherentes: un producto sin descuento no muestra "0% desc.".
2. `totalDiscountedProducts()` usa `filter` con la condición `getDiscount() > 0`, lo cual es un uso correcto de métodos funcionales para filtrar colecciones.
3. Los tests incluyen casos de error para constructor y descuento negativo, mostrando comprensión del patrón `expect(() => ...).toThrow()`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — `setDiscount()` no valida que el descuento sea ≤ 100

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.js` — método `setDiscount` |
| **Síntoma** | `product.setDiscount(150)` no lanza error. El producto queda con descuento 150%. |
| **Concepto** | **Validación de rango / programación defensiva.** |
| **Por qué está mal** | La consigna dice: "mínimo 0 y máximo 100". Se valida el mínimo (< 0) pero no el máximo. Un descuento de 150% no tiene sentido en un almacén. |
| **Pista** | Tu condición verifica solo una mitad del rango. ¿Qué otra comparación necesitás? |
| **Pregunta de chequeo** | ¿Qué pasa si llamás `setDiscount(101)`? ¿Es un descuento válido? |

---

#### C2 — `setDiscount()` no valida que el valor sea entero

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.js` — método `setDiscount` |
| **Síntoma** | `product.setDiscount(10.5)` no lanza error. El descuento queda como 10.5%. |
| **Concepto** | **Validación de tipo / Number.isInteger.** |
| **Por qué está mal** | La consigna especifica: "número entero". Un descuento de 10.5% puede generar problemas de cálculo y no es lo que el dominio espera. |
| **Pista** | ¿Qué función de JavaScript verifica si un número es entero? ¿Dónde deberías usarla? |
| **Pregunta de chequeo** | Si establecés descuento 10.5 y mostrás el producto, ¿"10.5% desc." es un valor que el almacén debería aceptar? |

---

#### C3 — Tests no cubren descuento > 100 ni no entero

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.test.js` |
| **Síntoma** | No hay test para `setDiscount(101)` ni para `setDiscount(10.5)`. |
| **Concepto** | **Cobertura de branches / testing de validaciones.** |
| **Por qué está mal** | Aunque la validación no existe aún, los tests deberían anticipar estos branches. Cuando se agregue la validación, los tests ya estarían escritos. Más importante: sin estos tests, la cobertura de branches no puede llegar a 100%. |
| **Pista** | Pensá en todos los valores que `setDiscount` debería rechazar. ¿Tenés un test para cada tipo de valor inválido? |

---

#### C4 — Faltan tests: almacén vacío, propagación de errores, `getProducts` retorna copia

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/grocery.test.js` |
| **Síntoma** | No hay test para `totalDiscountedProducts()` con almacén vacío. No hay test que verifique que `addProduct("")` propaga el error de `Product`. No hay test que verifique que `getProducts()` retorna una copia y no la referencia interna. |
| **Concepto** | **Cobertura completa / edge cases / encapsulación.** |
| **Por qué está mal** | Cada branch y caso de borde necesita su test. `totalDiscountedProducts()` con array vacío retorna 0 (es un branch de `filter`). La propagación de errores confirma que Grocery no "traga" excepciones de Product. |
| **Pista** | ¿Qué retorna `[].filter(fn).length`? ¿Qué pasa si dentro de `addProduct` se lanza un error desde `new Product()`? |

---

#### C5 — La interfaz no implementa cards Bootstrap para Frutas y Verduras

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` y `main.js` — paneles Frutas y Verduras |
| **Síntoma** | Los productos se muestran en `<ul class="list-group-numbered"><li>...</li></ul>`. No hay cards Bootstrap. |
| **Concepto** | **Cumplimiento de consigna / componentes Bootstrap.** |
| **Por qué está mal** | La consigna pide: "Usar el componente card de Bootstrap para mostrar los productos en los paneles Frutas y Verduras, con nombre como título y precio/descuento en el cuerpo". |
| **Pista** | Investigá la estructura HTML de un card de Bootstrap 5. ¿Qué clases necesitás? ¿Cómo crearías el card dinámicamente en `main.js`? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Test de `toString` con descuento 0 explícito

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.test.js` |
| **Síntoma** | Se testea `toString` sin establecer descuento y con descuento 10. Falta testear con descuento explícitamente establecido a 0 (después de `setDiscount(0)`). |
| **Concepto** | **Edge case testing.** |
| **Por qué importa** | Verificar que `setDiscount(0)` + `toString()` no muestra el descuento es un caso de borde importante que confirma que la condición `> 0` funciona correctamente. |

---

#### M2 — Tests sin nombres suficientemente descriptivos

| Aspecto | Detalle |
|---|---|
| **Dónde** | Ambos archivos de test |
| **Síntoma** | Algunos nombres son genéricos: "should add product with discount", "totalDiscountedProducts with some discounts". |
| **Concepto** | **Calidad de tests / legibilidad.** |
| **Por qué importa** | Nombres más específicos como "addProduct with discount 20 should set discount on created product" facilitan la lectura del reporte cuando un test falla. |

---

## 3. Preguntas guía para el estudiante

1. Tu `setDiscount` rechaza valores negativos. ¿Cuál es el otro extremo del rango que deberías rechazar?

2. ¿Qué diferencia hay entre `10` y `10.5` como descuento? ¿Cómo verificás que un valor es entero en JavaScript?

3. ¿Cuántos "caminos" posibles tiene tu `setDiscount` si validás negativo, mayor a 100, y no entero? ¿Cuántos tests tenés para cubrirlos?

4. Si llamás `totalDiscountedProducts()` sobre un almacén sin productos, ¿qué retorna? ¿Tenés un test para eso?

5. Si `addProduct("", 100, "Frutas")` lanza un `Error` desde el constructor de `Product`, ¿tu `Grocery` lo atrapa o lo deja pasar? ¿Tenés un test que lo verifique?

6. ¿Qué estructura HTML tiene un card de Bootstrap 5? ¿Qué clases CSS necesitás?

7. En `main.js`, ¿cómo crearías un card dinámicamente con `document.createElement`?

---

## 4. Plan de próximos pasos (verificables)

1. En `setDiscount`, agregar validación: lanzar `Error` si `discount > 100`.
2. En `setDiscount`, agregar validación: lanzar `Error` si `!Number.isInteger(discount)`.
3. En `product.test.js`, agregar test para `setDiscount(101)` → lanza error.
4. En `product.test.js`, agregar test para `setDiscount(10.5)` → lanza error.
5. En `product.test.js`, agregar test para `toString()` con descuento explícitamente 0.
6. En `grocery.test.js`, agregar test para `totalDiscountedProducts()` con almacén vacío.
7. En `grocery.test.js`, agregar test para `addProduct("")` → propaga error.
8. En `grocery.test.js`, agregar test para `getProducts()` retorna copia.
9. En `index.html`, reemplazar `<ul>` en Frutas y Verduras por contenedor para cards Bootstrap.
10. En `main.js`, crear función `createProductCard(product)` que genere un card con nombre como título, precio y descuento en el cuerpo.
11. En `main.js`, modificar `updateCatalog()` para usar `createProductCard` en vez de crear `<li>`.
12. Ejecutar tests con cobertura y verificar que sentencias y branches estén al 100%.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad |
|---|---|---|
| 1 | `#discount` se inicializa a 0 en el constructor | BLOQUEANTE |
| 2 | `setDiscount` valida que el valor sea entero | BLOQUEANTE |
| 3 | `setDiscount` valida rango 0–100 y lanza `Error` | BLOQUEANTE |
| 4 | `getDiscount` retorna el valor correcto | BLOQUEANTE |
| 5 | `toString()` muestra descuento solo si > 0 | BLOQUEANTE |
| 6 | `totalDiscountedProducts()` filtra por descuento > 0 | BLOQUEANTE |
| 7 | `addProduct()` acepta parámetro de descuento | BLOQUEANTE |
| 8 | Tests cubren `setDiscount` con valores válidos e inválidos (negativo, > 100, no entero) | BLOQUEANTE |
| 9 | Tests cubren `toString` con y sin descuento (incluido descuento 0) | BLOQUEANTE |
| 10 | Tests cubren `totalDiscountedProducts` con almacén vacío, con y sin descuentos | BLOQUEANTE |
| 11 | Tests cubren constructor de `Product` con datos inválidos | BLOQUEANTE |
| 12 | Tests verifican que `getProducts` retorna copia | BLOQUEANTE |
| 13 | Cobertura de tests alcanza 100% de sentencias y ramas | BLOQUEANTE |
| 14 | UI: campo descuento en formulario con `type="number"`, `min`, `max` | BLOQUEANTE |
| 15 | UI: "Total productos con descuento" en panel Inicio | BLOQUEANTE |
| 16 | UI: cards Bootstrap en paneles Frutas y Verduras | BLOQUEANTE |
| 17 | `main.js` integra correctamente descuento en `addProduct` | BLOQUEANTE |
| 18 | Tests tienen nombres descriptivos | NO BLOQUEANTE |
| 19 | Mensajes de error de validación son claros y descriptivos | NO BLOQUEANTE |
| 20 | El linter no reporta errores ni warnings | NO BLOQUEANTE |
