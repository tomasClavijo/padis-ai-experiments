# Evaluación Docente — Grocery.EstadoA

---

## 1. Resumen

La entrega muestra que el estudiante comprende la estructura básica del proyecto: declaró el campo `#discount` en `Product`, implementó `getDiscount()` y `setDiscount()`, y agregó `totalDiscountedProducts()` en `Grocery`. También escribió tests unitarios básicos. Sin embargo, el campo `#discount` **no se inicializa** en el constructor (queda `undefined`), `setDiscount()` **no tiene ninguna validación** (acepta valores negativos, mayores a 100, decimales, strings), y `toString()` muestra el descuento **siempre** (incluso cuando es `undefined` o 0). La función `totalDiscountedProducts()` retorna el **total de productos** en vez de filtrar solo los que tienen descuento. `addProduct()` no fue modificada para aceptar descuento. Los tests son insuficientes: no cubren casos de error, no testean `toString`, y un test de `grocery.test.js` tiene una aserción incorrecta. La interfaz no fue modificada en absoluto (faltan campo descuento, total con descuento, y cards Bootstrap).

**Aciertos reales:**

1. La estructura de archivos y módulos ES es correcta: `Product` y `Grocery` usan campos privados (`#`), `export`/`import`, y la separación `domain/` es adecuada.
2. El uso de `Array.find()` y operadores spread (`[...this.#products]`) en `getProducts()` demuestra conocimiento de patrones de encapsulación con colecciones.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — `#discount` no se inicializa en el constructor

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.js` — constructor de `Product` |
| **Síntoma** | El campo `#discount` se declara pero no se asigna en el constructor. Su valor es `undefined`. |
| **Concepto** | **Inicialización de estado / constructor completo.** |
| **Por qué está mal** | La consigna dice: "El descuento se inicializa en 0 por defecto". Un `Product` recién creado tiene descuento `undefined`, lo cual afecta a `toString()` (muestra "undefined% desc.") y a cualquier lógica que compare con 0. |
| **Pista** | Revisá tu constructor: ¿cuántos campos privados declarás y cuántos asignás? ¿Qué valor debería tener `#discount` al crear un producto nuevo? |
| **Pregunta de chequeo** | Si creás `new Product("Manzana", 100, "Frutas")` y llamás a `getDiscount()`, ¿qué devuelve? ¿Es lo que esperabas? |

---

#### C2 — `setDiscount()` no tiene ninguna validación

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.js` — método `setDiscount` |
| **Síntoma** | Se puede llamar a `setDiscount(-50)`, `setDiscount(200)`, `setDiscount(10.5)`, `setDiscount("hola")` sin que nada falle. |
| **Concepto** | **Programación defensiva / validación en setters.** |
| **Por qué está mal** | La consigna pide: "número entero, mínimo 0 y máximo 100, lanzar Error si no es válido". Sin validación, el setter es un simple asignador que acepta cualquier cosa. Un descuento de 200% o un string no tienen sentido en el dominio. |
| **Pista** | ¿Qué dos condiciones debés verificar del valor recibido antes de asignarlo? ¿Cómo verificás que un número es entero en JavaScript? |
| **Pregunta de chequeo** | ¿Qué pasa si llamás a `product.setDiscount(150)`? ¿Y `setDiscount("abc")`? ¿Es el comportamiento que esperarías de un almacén real? |

---

#### C3 — `toString()` muestra descuento siempre (incluso undefined o 0)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.js` — método `toString` |
| **Síntoma** | Un producto sin descuento muestra "Manzana - $100 (undefined% desc.)". Uno con descuento 0 muestra "Manzana - $100 (0% desc.)". |
| **Concepto** | **Lógica condicional / formato de salida.** |
| **Por qué está mal** | La consigna dice: "mostrar el descuento solo si es mayor a cero". No tiene sentido mostrar "0% desc." ni mucho menos "undefined% desc." al usuario. |
| **Pista** | ¿Qué condición debés evaluar antes de incluir el descuento en el string de salida? |
| **Pregunta de chequeo** | Si creás un producto sin establecer descuento, ¿qué debería mostrar `toString()`? ¿Y si el descuento es 0? |

---

#### C4 — `totalDiscountedProducts()` retorna el total de productos

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/grocery.js` — método `totalDiscountedProducts` |
| **Síntoma** | `return this.#products.length` devuelve la cantidad total, no los que tienen descuento. |
| **Concepto** | **Filtrado de colecciones.** |
| **Por qué está mal** | La consigna pide retornar el total de productos **con descuento > 0**. Si hay 5 productos y solo 2 tienen descuento, debería retornar 2, no 5. |
| **Pista** | ¿Qué método de Array usarías para quedarte solo con los elementos que cumplen una condición antes de contarlos? |
| **Pregunta de chequeo** | Si agregás 3 productos sin descuento y 1 con descuento 10%, ¿qué valor debería retornar `totalDiscountedProducts()`? ¿Qué retorna tu código? |

---

#### C5 — `addProduct()` no acepta parámetro de descuento

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/grocery.js` — método `addProduct` |
| **Síntoma** | La firma es `addProduct(name, price, category)` sin parámetro de descuento. |
| **Concepto** | **Cumplimiento de la consigna / parámetros opcionales.** |
| **Por qué está mal** | La consigna pide modificar `addProduct()` para aceptar un parámetro opcional `discount`. Sin esto, no hay forma de establecer descuento al agregar un producto desde la interfaz. |
| **Pista** | ¿Cómo se declara un parámetro con valor por defecto en JavaScript? ¿Qué método del producto usarías después de crearlo para establecer el descuento? |

---

#### C6 — Tests insuficientes: no cubren casos de error ni ramas

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/product.test.js` y `domain/grocery.test.js` |
| **Síntoma** | Solo hay 3 tests en `product.test.js` y 3 en `grocery.test.js`. No hay tests para: constructor con datos inválidos, `setDiscount` con valores inválidos, `toString` sin descuento, `toString` con descuento 0, `totalDiscountedProducts` sin productos con descuento, `getProducts` retorna copia. |
| **Concepto** | **Testing / cobertura de branches.** |
| **Por qué está mal** | La consigna pide 100% de cobertura de sentencias y ramas. Sin tests de error (ej. `expect(() => ...).toThrow()`), los branches de validación nunca se ejecutan en los tests. |
| **Pista** | Pensá en los caminos posibles de cada función. ¿Cuántos `if` hay? Cada `if` genera al menos 2 branches. ¿Tenés tests para ambos? |
| **Pregunta de chequeo** | Si corrés el coverage, ¿qué porcentaje esperás obtener con solo 3 tests por archivo? |

---

#### C7 — Aserción incorrecta en test de `totalDiscountedProducts`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `domain/grocery.test.js` — test "totalDiscountedProducts should return count" |
| **Síntoma** | Agrega un producto sin descuento y espera que `totalDiscountedProducts()` retorne 1. |
| **Concepto** | **Aserciones correctas / entender qué se testea.** |
| **Por qué está mal** | Un producto sin descuento no debería contarse como "producto con descuento". El valor esperado correcto sería 0. (Nota: el test pasa actualmente porque la implementación está mal — retorna `length` — pero eso oculta el error real.) |
| **Pista** | ¿Qué valor debería retornar `totalDiscountedProducts()` si ningún producto tiene descuento? ¿Tu aserción refleja eso? |

---

#### C8 — La interfaz no fue modificada

| Aspecto | Detalle |
|---|---|
| **Dónde** | `index.html` y `main.js` |
| **Síntoma** | No hay campo de descuento en el formulario, no se muestra "Total productos con descuento" en Inicio, y las listas Frutas/Verduras siguen usando `<ul>/<li>` en vez de cards Bootstrap. |
| **Concepto** | **Cumplimiento de consigna / integración dominio-UI.** |
| **Por qué está mal** | La Parte B completa de la consigna no fue implementada. Sin el campo de descuento, el usuario no puede establecer descuentos desde la interfaz. Sin cards, la presentación no cumple el requisito visual. |
| **Pista** | Revisá los puntos 7, 8 y 9 de la consigna. ¿Qué elementos HTML necesitás agregar? ¿Qué componente Bootstrap es un "card"? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — `main.js` no pasa descuento a `addProduct`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `main.js` — evento click de `btn-add` |
| **Síntoma** | La llamada a `addProduct` solo pasa nombre, precio y categoría. |
| **Concepto** | **Integración dominio-UI.** |
| **Por qué importa** | Aun si se agrega el campo al formulario y el parámetro a `addProduct`, hay que actualizar la llamada en `main.js` para leer el valor del input y pasarlo. |

---

## 3. Preguntas guía para el estudiante

1. ¿Qué valor tiene `#discount` en un producto recién creado si no lo asignás en el constructor? ¿Cómo se ve eso en `toString()`?

2. ¿Qué dos propiedades debe cumplir el descuento según la consigna? ¿Cómo verificás que un valor es entero en JavaScript?

3. Si `setDiscount(150)` no lanza error, ¿qué significa un descuento de 150% en un almacén? ¿Tiene sentido?

4. ¿Cuál es la diferencia entre `this.#products.length` y `this.#products.filter(p => p.getDiscount() > 0).length`? ¿Cuál necesitás?

5. ¿Cuántos "caminos" posibles tiene `setDiscount` si validás entero, >= 0 y <= 100? ¿Cuántos tests necesitás para cubrirlos todos?

6. Tu test de `totalDiscountedProducts` agrega un producto sin descuento y espera 1. ¿Es eso correcto? ¿Qué debería retornar?

7. ¿Qué componente de Bootstrap se usa para mostrar información en una tarjeta con título y cuerpo? ¿Cómo se estructura su HTML?

8. Si el formulario tiene un input de descuento, ¿cómo lo leés desde `main.js` y se lo pasás a `addProduct()`?

---

## 4. Plan de próximos pasos (verificables)

1. En el constructor de `Product`, inicializar `this.#discount = 0`.
2. En `setDiscount`, agregar validación: verificar que sea entero (`Number.isInteger`), lanzar `Error` si no.
3. En `setDiscount`, verificar que el valor esté entre 0 y 100, lanzar `Error` si no.
4. En `toString()`, agregar condición para mostrar descuento solo si `> 0`.
5. En `totalDiscountedProducts()`, usar `filter` para contar solo productos con descuento `> 0`.
6. En `addProduct()`, agregar parámetro `discount` con valor por defecto 0, y llamar a `setDiscount` si `> 0`.
7. En `product.test.js`, agregar tests para: constructor con nombre vacío, precio inválido, categoría inválida.
8. En `product.test.js`, agregar tests para: `setDiscount` negativo, mayor a 100, no entero.
9. En `product.test.js`, agregar tests para: `toString` sin descuento, `toString` con descuento 0, `toString` con descuento > 0.
10. En `grocery.test.js`, corregir aserción de `totalDiscountedProducts` (esperar 0 sin descuentos).
11. En `grocery.test.js`, agregar test con almacén vacío, con mezcla de productos con/sin descuento.
12. En `index.html`, agregar input de descuento en el formulario con atributos `type`, `min`, `max`.
13. En `index.html`, agregar "Total productos con descuento" en el panel Inicio.
14. En `index.html`, cambiar `<ul>` por estructura de cards Bootstrap en Frutas y Verduras.
15. En `main.js`, leer input de descuento y pasarlo a `addProduct()`, y crear cards en `updateCatalog()`.

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
| 8 | Tests cubren `setDiscount` con valores válidos e inválidos | BLOQUEANTE |
| 9 | Tests cubren `toString` con y sin descuento | BLOQUEANTE |
| 10 | Tests cubren `totalDiscountedProducts` con y sin descuentos | BLOQUEANTE |
| 11 | Tests cubren constructor de `Product` con datos inválidos | BLOQUEANTE |
| 12 | Cobertura de tests alcanza 100% de sentencias y ramas | BLOQUEANTE |
| 13 | UI: campo descuento en formulario con `type="number"` | BLOQUEANTE |
| 14 | UI: "Total productos con descuento" en panel Inicio | BLOQUEANTE |
| 15 | UI: cards Bootstrap en paneles Frutas y Verduras | BLOQUEANTE |
| 16 | `main.js` integra correctamente descuento en `addProduct` | BLOQUEANTE |
| 17 | Aserciones de tests son correctas (valores esperados válidos) | BLOQUEANTE |
| 18 | Tests tienen nombres descriptivos | NO BLOQUEANTE |
| 19 | Mensajes de error de validación son claros y descriptivos | NO BLOQUEANTE |
| 20 | El linter no reporta errores ni warnings | NO BLOQUEANTE |
