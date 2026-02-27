# Evaluación Docente — Tercera Revisión (Re-entrega) — Karate.EstadoC

---

## 1. Resumen

La entrega cumple **todos los requisitos de la consigna** de forma correcta y limpia. El estudiante resolvió la totalidad de los problemas conceptuales señalados en revisiones anteriores. La clase `Student` tiene las 5 propiedades requeridas correctamente inicializadas. `addStudent` crea instancias con `new Student()`, valida nombre no vacío, valida `beltLevel` contra un array de niveles permitidos, y lanza `Error` en ambos casos. `trainMove` valida existencia del estudiante y movimiento no vacío, lanzando errores explícitos. `winMatch` valida existencia del estudiante con error explícito. `getStudents` retorna una copia del array con spread operator. Todas las funciones y la clase se exportan correctamente. El `index.js` importa el módulo, demuestra el uso normal y el manejo de errores con `try/catch`. **No se detectan errores críticos ni bloqueantes.**

**Aciertos nuevos concretos:**

1. Se agregó validación completa de `beltLevel` contra un array de niveles válidos (`VALID_BELT_LEVELS`), separando los valores de dominio en una constante clara y usando `.includes()` para la verificación.
2. `trainMove` y `winMatch` ahora lanzan `Error` explícito cuando el estudiante no existe, eliminando los fallos silenciosos. Se agregó también validación de movimiento vacío en `trainMove`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

**No se detectan errores críticos.** La solución cumple todos los requisitos de la consigna en sus aspectos conceptuales y funcionales.

---

### MEJORAS (no bloqueantes)

Estas observaciones son **opcionales** y no afectan la corrección ni el cumplimiento de la consigna. Se ofrecen como oportunidades de profundización.

---

#### M1 — Considerar prevención de estudiantes duplicados

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `addStudent` |
| **Síntoma** | Se puede llamar `addStudent("Ryu", "black")` dos veces sin error, creando dos estudiantes con el mismo nombre. |
| **Concepto** | **Unicidad / integridad de datos.** |
| **Explicación docente** | Si `trainMove` y `winMatch` buscan por nombre, tener duplicados genera ambigüedad. No es un requisito de la consigna, pero en un sistema real sería importante garantizar unicidad. |
| **Pista** | Antes de agregar, podrías verificar si ya existe un estudiante con ese nombre usando `.find()`. |
| **Pregunta de chequeo** | Si "Ryu" aparece dos veces, ¿cuál de los dos gana cuando llamás `winMatch("Ryu")`? |

---

#### M2 — `getStudents` retorna copia superficial (shallow copy)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `getStudents`, `return [...students]` |
| **Síntoma** | El spread operator copia el array, pero los objetos `Student` dentro siguen siendo las mismas referencias. `getStudents()[0].name = "Hacker"` modificaría al estudiante real. |
| **Concepto** | **Copia superficial vs. copia profunda (shallow vs. deep copy).** |
| **Explicación docente** | Para esta consigna, la copia superficial es suficiente y correcta. Pero es bueno saber que el contenido del array (los objetos) sigue siendo mutable desde fuera. Una copia profunda (`structuredClone()` o `JSON.parse(JSON.stringify(...))`) protegería también los objetos internos, a costa de perder la instancia de `Student`. Es un trade-off de diseño. |
| **Pista** | Investigá `structuredClone()` (disponible desde Node 17). ¿En qué se diferencia de `[...array]`? |

---

#### M3 — Los mensajes de error podrían incluir el nombre del parámetro

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — funciones de validación |
| **Síntoma** | Los mensajes como `"El nombre no puede ser vacío."` son claros, pero en un sistema más grande podrían beneficiarse de incluir contexto de la función (`"addStudent: El nombre no puede ser vacío."`). |
| **Concepto** | **Trazabilidad de errores.** |
| **Explicación docente** | No es un error, es una buena práctica para sistemas más complejos donde un error capturado a varios niveles de profundidad necesita ser rastreable. |

---

#### M4 — Oportunidad de usar `Object.freeze` para el array de niveles válidos

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — `VALID_BELT_LEVELS` |
| **Síntoma** | El array de niveles válidos está declarado con `const`, lo cual impide reasignación, pero no impide `.push()` o `.splice()` que modificarían su contenido. |
| **Concepto** | **Inmutabilidad de constantes de configuración.** |
| **Explicación docente** | Usar `Object.freeze(VALID_BELT_LEVELS)` haría que cualquier intento de modificar el array lanzara un error en modo estricto. Es una buena práctica para constantes de dominio que no deberían cambiar en runtime. |

---

## 3. Problemas previamente resueltos

La entrega resuelve **correctamente** todos los conceptos que típicamente fallan en este ejercicio:

| # | Concepto | Estado |
|---|---|---|
| 1 | Clase `Student` con las 5 propiedades requeridas | Correcto |
| 2 | `addStudent` crea instancias con `new Student()` | Correcto |
| 3 | `addStudent` valida nombre no vacío y lanza `Error` | Correcto |
| 4 | `addStudent` valida `beltLevel` contra lista de niveles permitidos | Correcto |
| 5 | `trainMove` valida existencia del estudiante y lanza `Error` | Correcto |
| 6 | `trainMove` valida movimiento no vacío y lanza `Error` | Correcto |
| 7 | `trainMove` agrega `{ move, date: new Date() }` (objeto compuesto) | Correcto |
| 8 | `winMatch` valida existencia del estudiante y lanza `Error` | Correcto |
| 9 | `winMatch` incrementa `victories` correctamente (inicializada en 0) | Correcto |
| 10 | `getStudents` retorna copia del array con spread operator | Correcto |
| 11 | Se exportan `Student` y las 4 funciones en `module.exports` | Correcto |
| 12 | `index.js` demuestra uso normal y manejo de errores con `try/catch` | Correcto |
| 13 | `joinedDate` se inicializa como `new Date(joinedTimestamp)` con default | Correcto |
| 14 | Uso de `let`/`const` en vez de `var` | Correcto |
| 15 | Niveles de cinturón válidos separados en constante (`VALID_BELT_LEVELS`) | Correcto |
| 16 | Se usa `.trim()` para limpiar entradas de texto | Correcto |

---

## 4. Preguntas guía para el estudiante

Estas preguntas no señalan errores: son disparadores para profundizar conceptos a partir de una solución que ya funciona correctamente.

1. ¿Qué ventaja tiene definir los niveles de cinturón en un array separado (`VALID_BELT_LEVELS`) en vez de hardcodearlos en la validación? ¿Cómo ayuda a la mantenibilidad?

2. ¿Qué diferencia hay entre `[...students]` (copia superficial) y `structuredClone(students)` (copia profunda)? ¿En qué caso la diferencia importaría?

3. Si quisieras agregar un método `getInfo()` a `Student` que retorne un string descriptivo, ¿dónde lo definirías? ¿Los objetos creados con `new Student()` lo tendrían automáticamente?

4. ¿Qué pasaría si quisieras implementar `removeStudent(name)`? ¿Cómo lo harías sin romper la encapsulación?

5. ¿Cómo podrías hacer tests automatizados para verificar que las validaciones funcionan? ¿Qué framework de testing de JavaScript conocés?

6. ¿Qué pasa si dos estudiantes tienen el mismo nombre? ¿Cómo lo solucionarías? ¿Usarías un ID numérico, un UUID, o alguna otra estrategia?

7. Si quisieras que `VALID_BELT_LEVELS` no pudiera ser modificado en runtime (ej. que nadie pueda hacer `.push()` sobre él), ¿qué mecanismo de JavaScript usarías?

8. ¿Qué ventaja tiene usar `throw new Error(...)` en vez de retornar `null` o `false` para indicar un error? ¿Cuándo usarías cada enfoque?

---

## 5. Plan de próximos pasos (verificables)

Dado que la solución está completa y correcta, los siguientes pasos apuntan a **profundizar y extender** los conceptos aprendidos.

1. Agregar un método `getInfo()` a la clase `Student` que retorne un string con toda la información del estudiante (nombre, cinturón, cantidad de movimientos, victorias, fecha de ingreso). Verificar que los objetos existentes lo tengan.
2. Implementar `removeStudent(name)` que busque y elimine un estudiante del array. Validar existencia y lanzar `Error` si no se encuentra.
3. Aplicar `Object.freeze(VALID_BELT_LEVELS)` y verificar que intentar `.push()` al array lanza error.
4. Considerar agregar validación de unicidad de nombre en `addStudent`.
5. Crear tests automatizados con Jest o Vitest que verifiquen: (a) creación exitosa de estudiantes, (b) validaciones lanzan `Error` con los mensajes correctos, (c) `getStudents()` retorna copia (modificar la copia no afecta el original), (d) `winMatch` incrementa correctamente.
6. Investigar `structuredClone()` para hacer copia profunda en `getStudents()`. Evaluar si es necesario para este caso.
7. Implementar un sistema de ranking que ordene estudiantes por victorias.
8. Investigar cómo migrar de `module.exports`/`require` a ES Modules (`export`/`import`).
9. Reflexionar: si quisieras que `Student` tuviera propiedades privadas (no modificables desde fuera), ¿cómo lo harías? Investigá los `#privateFields` de JavaScript (ES2022).
10. Leer sobre el principio de **responsabilidad única** (SRP): cada función hace una sola cosa. ¿Tu código lo cumple?

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | La clase `Student` tiene todas las propiedades requeridas | BLOQUEANTE | OK |
| 2 | `addStudent` crea instancias con `new Student()` | BLOQUEANTE | OK |
| 3 | `addStudent` valida `name` no vacío y lanza `Error` | BLOQUEANTE | OK |
| 4 | `addStudent` valida `beltLevel` contra lista de niveles permitidos | BLOQUEANTE | OK |
| 5 | `trainMove` valida existencia del estudiante y lanza `Error` | BLOQUEANTE | OK |
| 6 | `trainMove` valida `move` no vacío | BLOQUEANTE | OK |
| 7 | `trainMove` agrega objeto `{ move, date }` | BLOQUEANTE | OK |
| 8 | `winMatch` valida existencia del estudiante y lanza `Error` | BLOQUEANTE | OK |
| 9 | `getStudents` retorna copia del array | BLOQUEANTE | OK |
| 10 | Se exportan `Student` y las 4 funciones | BLOQUEANTE | OK |
| 11 | `index.js` importa y usa el módulo correctamente | BLOQUEANTE | OK |
| 12 | `victories` se inicializa en 0 | BLOQUEANTE | OK |
| 13 | `joinedDate` se inicializa correctamente | BLOQUEANTE | OK |
| 14 | Uso de `let`/`const` en vez de `var` | NO BLOQUEANTE | OK |
| 15 | `index.js` demuestra manejo de errores con `try/catch` | NO BLOQUEANTE | OK |
| 16 | Niveles válidos separados en constante de dominio | NO BLOQUEANTE | OK |
| 17 | Se usa `.trim()` para limpiar entradas | NO BLOQUEANTE | OK |
| 18 | Los mensajes de error son descriptivos | NO BLOQUEANTE | OK |

---

**Valoración global: APROBADO — Todos los criterios cumplidos.**

La solución demuestra comprensión sólida de diseño de clases, validación de datos, manejo de errores explícito, encapsulación, y modularización. El código es limpio, defensivo y cumple la consigna en todos sus puntos. Las únicas observaciones son mejoras opcionales de diseño avanzado (copia profunda, unicidad, inmutabilidad de constantes, campos privados) que exceden el alcance de este ejercicio pero sirven como guía para seguir creciendo.
