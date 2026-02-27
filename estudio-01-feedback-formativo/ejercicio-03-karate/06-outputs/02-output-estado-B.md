# Evaluación Docente — Segunda Revisión (Re-entrega) — Karate.EstadoB

---

## 1. Resumen

La re-entrega muestra un **avance muy significativo** respecto de la versión anterior. El estudiante comprendió y aplicó correctamente los conceptos centrales que fallaban: la clase `Student` ahora tiene todas las propiedades requeridas (`victories`, `joinedDate`), `addStudent` crea instancias con `new Student()`, `trainMove` agrega objetos `{ move, date }` y verifica existencia del estudiante, y `winMatch` también verifica existencia. Se corrigió el uso de `var` por `let`, se exporta la clase `Student`, y se agregó validación de nombre vacío en `addStudent`. Sin embargo, persisten problemas: `addStudent` **no valida el nivel de cinturón**, `trainMove` y `winMatch` **fallan silenciosamente** cuando el estudiante no existe (no lanzan `Error`), `trainMove` **no valida que el movimiento sea no vacío**, y `getStudents` **retorna la referencia directa** al array interno.

**Aciertos nuevos concretos:**

1. `addStudent` ahora crea instancias con `new Student(name, beltLevel, Date.now())` — la clase se utiliza correctamente y los objetos tienen todas las propiedades inicializadas.
2. `trainMove` y `winMatch` verifican existencia del estudiante con `if (student)` antes de operar — el código ya no crashea con `TypeError`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — `addStudent` no valida el nivel de cinturón

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `addStudent` |
| **Síntoma** | Se puede llamar `addStudent("Akuma", "super-saiyan")` sin que nada falle. |
| **Concepto** | **Validación de datos / dominio del problema.** |
| **Explicación docente** | La consigna pide: "Validar que `beltLevel` sea uno de: white, yellow, orange, green, blue, brown, black". Un dojo de karate tiene niveles de cinturón definidos; aceptar cualquier string rompe la integridad de los datos. Ya demostraste que sabés validar (lo hacés con el nombre). Falta aplicar el mismo criterio al cinturón. |
| **Pista** | Definí un array con los niveles válidos y usá `.includes()` para verificar antes de crear el estudiante. |
| **Pregunta de chequeo** | Si `getStudents()` devuelve un estudiante con `beltLevel: "super-saiyan"`, ¿tiene sentido en un sistema de karate? |

---

#### C2 — `trainMove` falla silenciosamente cuando el estudiante no existe

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `trainMove`, bloque `if (student)` |
| **Síntoma** | Si el estudiante no existe, la función simplemente no hace nada. No lanza error ni comunica el problema. En `index.js`: `trainMove("Fantasma", "Golpe invisible")` pasa sin aviso. |
| **Concepto** | **Manejo de errores / fallo silencioso vs. fallo explícito.** |
| **Explicación docente** | La consigna dice: "Validar que el estudiante exista (lanzar `Error` si no)". El `if (student)` es un buen primer paso (evita el crasheo del Estado A), pero **falta la rama `else`** que lance el error. Un fallo silencioso oculta bugs: el código llamante cree que el entrenamiento se registró, pero no fue así. |
| **Pista** | Tu `if` verifica correctamente. ¿Qué agregarías para comunicar el error cuando el estudiante no se encuentra? |
| **Pregunta de chequeo** | Si llamás `trainMove("Fantasma", "Golpe")` y luego revisás los estudiantes, ¿cómo sabés que falló? ¿El código llamante tiene forma de enterarse? |

---

#### C3 — `winMatch` falla silenciosamente cuando el estudiante no existe

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `winMatch`, bloque `if (student)` |
| **Síntoma** | Mismo problema que `trainMove`: si el estudiante no existe, no pasa nada. |
| **Concepto** | **Manejo de errores / fallo silencioso.** |
| **Explicación docente** | La consigna pide lanzar `Error` si el estudiante no existe. El patrón es el mismo que en `trainMove`. |
| **Pista** | Aplicá el mismo enfoque que necesitás corregir en `trainMove`. |

---

#### C4 — `trainMove` no valida que el movimiento no sea vacío

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `trainMove` |
| **Síntoma** | Se puede llamar `trainMove("Ryu", "")` y se registra un movimiento vacío sin error. |
| **Concepto** | **Validación de datos.** |
| **Explicación docente** | La consigna dice: "Validar que `move` no sea vacío". Registrar un movimiento sin nombre no tiene sentido en el dominio. Ya sabés validar (lo hacés con el nombre en `addStudent`); falta aplicar la misma lógica acá. |
| **Pista** | Usá la misma técnica de verificación que usás para el nombre en `addStudent`. |

---

#### C5 — `getStudents` retorna la referencia directa al array interno

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `getStudents`, `return students` |
| **Síntoma** | El código externo puede modificar el array interno del módulo. Si alguien hace `getStudents().push(...)`, el cambio afecta al array real. |
| **Concepto** | **Encapsulación / inmutabilidad.** |
| **Explicación docente** | La consigna pide: "retorna una **copia** del array". Las funciones `addStudent`, `trainMove` y `winMatch` existen para controlar cómo se modifica el estado interno. Si `getStudents` entrega la referencia directa, cualquiera puede bypassear esas funciones y romper la integridad de los datos. |
| **Pista** | Investigá `[...students]` (spread operator) o `Array.from(students)`. ¿Cuál es la diferencia entre retornar la referencia y retornar una copia? |
| **Pregunta de chequeo** | Si hacés `const lista = getStudents(); lista.length = 0;`, ¿se borran los estudiantes del módulo? ¿Debería? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — `index.js` no maneja errores con `try/catch`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/index.js` |
| **Síntoma** | Las llamadas a `trainMove("Fantasma", ...)` y `winMatch("Fantasma")` pasan sin aviso porque las funciones fallan silenciosamente. Cuando se corrijan los errores C2/C3, estas líneas van a lanzar excepciones no capturadas. |
| **Concepto** | **Manejo de errores en código cliente.** |
| **Por qué importa** | Es buena práctica que el `index.js` demuestre cómo se manejan los errores lanzados por el módulo. |
| **Pista** | Envolvé las llamadas que pueden fallar en bloques `try/catch` para capturar y mostrar los mensajes de error. |

---

#### M2 — Se permite agregar estudiantes con nombres duplicados

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `addStudent` |
| **Síntoma** | Se puede llamar `addStudent("Ryu", "black")` dos veces y se crean dos estudiantes "Ryu". |
| **Concepto** | **Unicidad / integridad de datos.** |
| **Por qué importa** | Si `trainMove` y `winMatch` buscan por nombre, tener duplicados genera ambigüedad (siempre se opera sobre el primero encontrado). No es un requisito explícito de la consigna, pero es una mejora de diseño valiosa. |

---

## 3. Problemas previamente resueltos

La re-entrega resuelve **correctamente** los siguientes conceptos que fallaban en la versión anterior:

| # | Problema anterior | Estado actual |
|---|---|---|
| 1 | Clase `Student` sin `victories` ni `joinedDate` | Ahora tiene las 5 propiedades requeridas. |
| 2 | `addStudent` creaba objetos literales en vez de `new Student()` | Ahora usa `new Student(name, beltLevel, Date.now())`. |
| 3 | `trainMove` crasheaba con `TypeError` si el estudiante no existía | Ahora verifica con `if (student)` (no crashea). |
| 4 | `trainMove` agregaba solo el string del movimiento | Ahora agrega `{ move, date: new Date() }`. |
| 5 | `winMatch` crasheaba con `TypeError` si el estudiante no existía | Ahora verifica con `if (student)` (no crashea). |
| 6 | `winMatch` producía `NaN` al incrementar `victories` | Ahora `victories` se inicializa en 0, `++` funciona correctamente. |
| 7 | La clase `Student` no se exportaba | Ahora se incluye en `module.exports`. |
| 8 | Uso de `var` | Ahora usa `let`. |
| 9 | `addStudent` no validaba nada | Ahora valida nombre vacío. |

**Esto es un progreso muy significativo.** Los problemas de crasheo, datos corruptos y código muerto están resueltos. El módulo es funcional y la clase se utiliza correctamente.

---

## 4. Preguntas guía para el estudiante

1. Ya validás que el nombre no sea vacío. ¿Por qué no aplicás la misma lógica para el nivel de cinturón? ¿Cuáles son los valores válidos según la consigna?

2. Tu `if (student)` en `trainMove` evita el crasheo. Pero si el estudiante no existe, ¿cómo se entera el código que llamó a `trainMove`? ¿Qué diferencia hay entre no hacer nada y lanzar un `Error`?

3. Si llamás `trainMove("Fantasma", "Golpe")`, tu función no hace nada ni avisa. ¿Cómo cambiaría el comportamiento si agregás un `else { throw new Error(...) }`?

4. ¿Qué pasa si hacés `const lista = getStudents(); lista.push({ name: "Intruso" });`? ¿Aparece "Intruso" en la próxima llamada a `getStudents()`? ¿Debería?

5. La consigna pide que `trainMove` valide que `move` no sea vacío. ¿Dónde agregarías esa validación?

6. Si dos estudiantes se llaman "Ryu", ¿cuál de los dos se entrena cuando llamás `trainMove("Ryu", "Hadouken")`? ¿Es un problema?

7. ¿Qué diferencia hay entre un fallo silencioso (`if` sin `else`) y un fallo explícito (`throw new Error(...)`)? ¿Cuál prefiere un equipo de desarrollo y por qué?

8. ¿Tu `index.js` demuestra qué pasa cuando se pasan datos inválidos? ¿Cómo podrías mostrar el manejo de errores?

---

## 5. Plan de próximos pasos (verificables)

1. **Agregar validación de `beltLevel`** en `addStudent`: definir un array con los niveles válidos y verificar con `.includes()` antes de crear el estudiante. Lanzar `Error` si el nivel no es válido.
2. **Convertir fallo silencioso en fallo explícito en `trainMove`**: agregar `else { throw new Error(...) }` cuando el estudiante no se encuentra.
3. **Convertir fallo silencioso en fallo explícito en `winMatch`**: mismo patrón que `trainMove`.
4. **Agregar validación de `move` vacío** en `trainMove`: verificar antes de buscar al estudiante.
5. **Retornar copia del array** en `getStudents`: cambiar `return students` por `return [...students]`.
6. **En `index.js`**, envolver las llamadas que pueden fallar en `try/catch` para demostrar el manejo de errores.
7. **En `index.js`**, agregar ejemplos que demuestren las validaciones: nombre vacío, cinturón inválido, estudiante inexistente, movimiento vacío.
8. Ejecutar y verificar que: (a) `addStudent("", "white")` lanza error, (b) `addStudent("X", "super-saiyan")` lanza error, (c) `trainMove("Fantasma", "Golpe")` lanza error, (d) `winMatch("Fantasma")` lanza error, (e) `trainMove("Ryu", "")` lanza error.
9. Verificar que `getStudents().push(...)` no modifica el array interno.
10. **(Opcional)** Considerar validación de nombres duplicados en `addStudent`.

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | La clase `Student` tiene todas las propiedades requeridas | BLOQUEANTE | OK |
| 2 | `addStudent` crea instancias con `new Student()` | BLOQUEANTE | OK |
| 3 | `addStudent` valida `name` no vacío y lanza `Error` | BLOQUEANTE | OK |
| 4 | `addStudent` valida `beltLevel` contra lista de niveles permitidos | BLOQUEANTE | Pendiente |
| 5 | `trainMove` valida existencia del estudiante y lanza `Error` | BLOQUEANTE | Parcial (no lanza) |
| 6 | `trainMove` valida `move` no vacío | BLOQUEANTE | Pendiente |
| 7 | `trainMove` agrega objeto `{ move, date }` | BLOQUEANTE | OK |
| 8 | `winMatch` valida existencia del estudiante y lanza `Error` | BLOQUEANTE | Parcial (no lanza) |
| 9 | `getStudents` retorna copia del array | BLOQUEANTE | Pendiente |
| 10 | Se exportan `Student` y las 4 funciones | BLOQUEANTE | OK |
| 11 | `index.js` importa y usa el módulo correctamente | BLOQUEANTE | OK |
| 12 | `victories` se inicializa en 0 | BLOQUEANTE | OK |
| 13 | `joinedDate` se inicializa correctamente | BLOQUEANTE | OK |
| 14 | Uso de `let`/`const` en vez de `var` | NO BLOQUEANTE | OK |
| 15 | `index.js` demuestra manejo de errores con `try/catch` | NO BLOQUEANTE | Pendiente |
| 16 | No se permiten estudiantes duplicados por nombre | NO BLOQUEANTE | Pendiente |
| 17 | Los mensajes de error son descriptivos | NO BLOQUEANTE | Parcial |
| 18 | No hay código muerto | NO BLOQUEANTE | OK |

---

**Valoración global:** El estudiante resolvió los problemas estructurales más graves (uso de la clase, inicialización de propiedades, estructura de datos de movimientos, manejo básico de existencia). El módulo **funciona sin crasheos**. Los puntos pendientes son de robustez: completar las validaciones requeridas por la consigna (cinturón, movimiento vacío), convertir fallos silenciosos en errores explícitos, y proteger el array interno con una copia. El progreso es claro y demuestra que el estudiante incorporó los conceptos señalados.
