# Evaluación Docente — Karate.EstadoA

---

## 1. Resumen

La entrega demuestra que el estudiante comprende la estructura básica de un módulo Node.js: define una clase `Student`, declara funciones para operar sobre un array de estudiantes, y exporta las funciones mediante `module.exports`. El `index.js` importa y utiliza el módulo correctamente. Sin embargo, la clase `Student` está **incompleta** (faltan `victories` y `joinedDate`), y lo más grave es que **nunca se usa**: `addStudent` crea objetos literales en vez de instancias de `Student`, dejando la clase como código muerto. No existe **ninguna validación** en las funciones, lo cual provoca que se puedan agregar estudiantes con nombre vacío o cinturones inválidos. `trainMove` y `winMatch` no verifican si el estudiante existe, generando crasheos por acceso a `undefined`. Además, `winMatch` intenta incrementar `victories` sobre un campo inexistente (produce `NaN`), y `getStudents` retorna la referencia directa al array interno.

**Aciertos reales:**

1. La estructura general del módulo es correcta: se definen funciones, se usa `module.exports`, y el `index.js` las importa con `require` y destructuring.
2. El uso de `Array.find()` para buscar estudiantes por nombre en `trainMove` y `winMatch` demuestra conocimiento de métodos de array de JavaScript.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — La clase `Student` no tiene las propiedades `victories` ni `joinedDate`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — constructor de `Student` |
| **Síntoma** | El constructor solo inicializa `name`, `beltLevel` y `moves`. Faltan `victories` (number, 0) y `joinedDate` (Date). |
| **Concepto** | **Diseño de clases / inicialización completa.** |
| **Por qué está mal** | La consigna pide explícitamente 5 propiedades. Sin `victories`, la función `winMatch` no puede funcionar correctamente (incrementar algo que no existe produce `NaN`). Sin `joinedDate`, se pierde el registro temporal del ingreso al dojo. |
| **Pista** | Revisá cuántas propiedades pide la consigna y cuántas inicializa tu constructor. ¿Qué valor debería tener `victories` al crear un estudiante nuevo? ¿Y `joinedDate`? |
| **Pregunta de chequeo** | Si creás `new Student("Ryu", "black")`, ¿qué valor tiene `student.victories`? ¿Y `student.joinedDate`? |

---

#### C2 — `addStudent` no usa `new Student()`: crea objetos literales

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `addStudent` |
| **Síntoma** | En vez de `new Student(name, beltLevel)`, se hace `students.push({ name, beltLevel, moves: [] })`. |
| **Concepto** | **Uso de clases / instanciación.** |
| **Por qué está mal** | La clase `Student` queda como código muerto: se define pero nunca se instancia. Los objetos literales no tienen la estructura completa que tendría una instancia de `Student` (faltan `victories`, `joinedDate`). Además, si mañana se agrega lógica al constructor (validación, valores por defecto), los objetos literales no la recibirían. |
| **Pista** | Definiste una clase con un constructor, pero ¿la usás en algún lugar? ¿Qué diferencia hay entre `{ name, beltLevel }` y `new Student(name, beltLevel)`? |
| **Pregunta de chequeo** | Si agregás un método a la clase `Student`, ¿los objetos creados con `{}` lo tendrían disponible? |

---

#### C3 — Ausencia total de validaciones en `addStudent`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `addStudent` |
| **Síntoma** | Se puede llamar a `addStudent("", "super-saiyan")` sin que nada falle. |
| **Concepto** | **Programación defensiva / validación de entradas.** |
| **Por qué está mal** | La consigna pide: validar que `name` no sea vacío, validar que `beltLevel` sea uno de los niveles permitidos, y lanzar `Error` si la validación falla. No hay nada de esto en el código. Un dojo con un estudiante sin nombre y cinturón "super-saiyan" no tiene sentido. |
| **Pista** | ¿Qué debería pasar si alguien llama a `addStudent("", "super-saiyan")`? ¿Cómo comunicás que la entrada es inválida en JavaScript? |
| **Pregunta de chequeo** | ¿Qué mecanismo de JavaScript usarías para rechazar un valor inválido y comunicarle al código llamante que algo salió mal? |

---

#### C4 — `trainMove` no verifica existencia del estudiante → crashea

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `trainMove` |
| **Síntoma** | Si `name` no corresponde a ningún estudiante, `students.find()` retorna `undefined`. Luego, `undefined.moves.push(move)` crashea con `TypeError: Cannot read properties of undefined`. |
| **Concepto** | **Manejo de errores / programación defensiva.** |
| **Por qué está mal** | La consigna pide: "Validar que el estudiante exista (lanzar `Error` si no)". En vez de un error controlado y descriptivo, el programa crashea con un `TypeError` críptico que no ayuda al usuario a entender qué pasó. |
| **Pista** | ¿Qué retorna `Array.find()` cuando no encuentra nada? ¿Qué deberías hacer antes de usar el resultado? |
| **Pregunta de chequeo** | ¿Qué pasa si llamás `trainMove("Fantasma", "Golpe")`? ¿El error que se produce explica claramente el problema? |

---

#### C5 — `trainMove` agrega solo el string del movimiento, no un objeto `{ move, date }`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `trainMove`, `student.moves.push(move)` |
| **Síntoma** | Se agrega el string directo (ej. `"Hadouken"`) en vez de un objeto `{ move: "Hadouken", date: new Date() }`. |
| **Concepto** | **Estructura de datos / cumplimiento de especificación.** |
| **Por qué está mal** | La consigna dice que cada movimiento debe registrarse como un objeto con el nombre del movimiento y la fecha de entrenamiento. Guardar solo el string pierde la información temporal y cambia la estructura del dato. |
| **Pista** | Revisá qué estructura pide la consigna para cada movimiento en el array `moves`. ¿Tu código produce esa estructura? |
| **Pregunta de chequeo** | Si querés saber *cuándo* Ryu aprendió "Hadouken", ¿podés hacerlo con la estructura actual? |

---

#### C6 — `trainMove` no valida que el movimiento no sea vacío

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `trainMove` |
| **Síntoma** | Se puede llamar a `trainMove("Ryu", "")` sin error. |
| **Concepto** | **Validación de datos.** |
| **Por qué está mal** | La consigna pide: "Validar que `move` no sea vacío". Un movimiento vacío no tiene sentido en el dominio. |
| **Pista** | ¿Tiene sentido registrar un entrenamiento de un movimiento que no tiene nombre? |

---

#### C7 — `winMatch` no verifica existencia del estudiante → crashea

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `winMatch` |
| **Síntoma** | Mismo problema que `trainMove`: si el estudiante no existe, `undefined.victories++` crashea con `TypeError`. |
| **Concepto** | **Manejo de errores / programación defensiva.** |
| **Por qué está mal** | La consigna pide validación explícita con `Error`. El crasheo descontrolado no es un manejo de errores aceptable. |
| **Pista** | Aplicá la misma lógica de verificación que necesitás en `trainMove`. |

---

#### C8 — `winMatch` incrementa `victories` sobre `undefined` → produce `NaN`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `winMatch`, `student.victories++` |
| **Síntoma** | Los objetos creados por `addStudent` son literales sin propiedad `victories`. Al hacer `undefined++` se obtiene `NaN`, no un número. |
| **Concepto** | **Inicialización de estado / coherencia de datos.** |
| **Por qué está mal** | Un estudiante que gana un partido debería tener `victories === 1`, no `NaN`. Este error es consecuencia directa de C2 (no usar `new Student()`). |
| **Pista** | ¿Qué resultado da `undefined + 1` en JavaScript? ¿Y `0 + 1`? ¿Dónde debería inicializarse `victories`? |
| **Pregunta de chequeo** | Después de llamar a `winMatch("Ryu")` dos veces, ¿cuánto vale `ryu.victories`? ¿Es lo que esperabas? |

---

#### C9 — `getStudents` retorna la referencia directa al array interno

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — función `getStudents`, `return students` |
| **Síntoma** | El código externo puede modificar el array interno del módulo directamente. En `index.js` se demuestra: `lista.push({ name: "Intruso" })` afecta al array real. |
| **Concepto** | **Encapsulación / inmutabilidad.** |
| **Por qué está mal** | La consigna dice: "retorna una **copia** del array de estudiantes". Retornar la referencia directa rompe la encapsulación del módulo: cualquier consumidor puede agregar, eliminar o modificar estudiantes sin pasar por las funciones validadas. |
| **Pista** | Investigá el operador spread (`[...array]`) o `Array.from()`. ¿Cuál es la diferencia entre retornar `students` y retornar `[...students]`? |
| **Pregunta de chequeo** | Si alguien hace `getStudents().push({ name: "Intruso" })`, ¿aparece "Intruso" en la próxima llamada a `getStudents()`? ¿Debería? |

---

#### C10 — La clase `Student` no se exporta

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — `module.exports` |
| **Síntoma** | `module.exports = { addStudent, trainMove, winMatch, getStudents }` — falta `Student`. |
| **Concepto** | **Modularización / exports.** |
| **Por qué está mal** | La consigna pide exportar la clase junto con las funciones. Sin exportar `Student`, el código consumidor no puede crear instancias directamente ni usar `instanceof` para verificar tipos. |
| **Pista** | Revisá qué elementos pide la consigna que se exporten. ¿Están todos en tu `module.exports`? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Uso de `var` en lugar de `let`/`const`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/karate.js` — `var students = []` |
| **Síntoma** | Se usa `var` para declarar el array de estudiantes. |
| **Concepto** | **Buenas prácticas de JavaScript moderno.** |
| **Por qué importa** | `var` tiene *function scope* y permite re-declaración, lo cual puede causar bugs sutiles. `let` tiene *block scope* y es más seguro. No es un error funcional, pero es una práctica desaconsejada en JavaScript moderno. |
| **Pista** | ¿Cuál es la diferencia de scope entre `var` y `let`? ¿Por qué se recomienda `let`/`const` desde ES6? |

---

#### M2 — `index.js` no maneja errores con `try/catch`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `src/index.js` |
| **Síntoma** | Las llamadas a funciones no están envueltas en `try/catch`. Si una falla, el programa se detiene sin explicación amigable. |
| **Concepto** | **Manejo de errores en código cliente.** |
| **Por qué importa** | Cuando las funciones lancen `Error` (una vez se agreguen las validaciones), el código consumidor debería poder atraparlos y mostrar mensajes claros en vez de crashear. |

---

## 3. Preguntas guía para el estudiante

1. Definiste una clase `Student` con un constructor. ¿En qué parte de tu código la usás con `new`? Si no la usás, ¿por qué la definiste?

2. ¿Qué diferencia hay entre `students.push({ name, beltLevel })` y `students.push(new Student(name, beltLevel))`? ¿Cuál produce objetos con todas las propiedades que necesitás?

3. ¿Qué retorna `Array.find()` cuando no encuentra ningún elemento? ¿Qué pasa si intentás acceder a una propiedad de ese resultado?

4. ¿Qué resultado da `undefined++` en JavaScript? ¿Y `0++`? ¿Dónde debería inicializarse `victories` para que funcione correctamente?

5. Si alguien llama a `addStudent("", "super-saiyan")`, ¿qué esperarías que pase? ¿Qué pasa realmente con tu código?

6. ¿Cuál es la diferencia entre retornar `students` y retornar `[...students]` en `getStudents()`? ¿Por qué importa?

7. Si mañana querés agregar un método `getFullInfo()` a la clase `Student`, ¿los objetos creados con `{}` lo tendrían? ¿Y los creados con `new Student()`?

8. ¿Qué debería pasar si llamás `trainMove("Fantasma", "Golpe")` para un estudiante que no existe? ¿Tu código comunica el problema claramente?

9. Tu `module.exports` exporta 4 cosas. La consigna pide 5. ¿Cuál falta?

10. ¿Por qué la consigna pide guardar cada movimiento como `{ move, date }` en vez de solo el string? ¿Qué información se perdería?

---

## 4. Plan de próximos pasos (verificables)

1. Completar el constructor de `Student` con `victories = 0` y `joinedDate = new Date(joinedTimestamp)`, usando un parámetro con valor por defecto.
2. En `addStudent`, reemplazar el objeto literal por `new Student(name, beltLevel, Date.now())`.
3. Agregar validación en `addStudent`: verificar que `name` no sea vacío, lanzar `Error` si lo es.
4. Agregar validación en `addStudent`: verificar que `beltLevel` sea uno de los niveles permitidos, lanzar `Error` si no.
5. En `trainMove`, verificar que el estudiante exista antes de operar. Si no existe, lanzar `Error` descriptivo.
6. En `trainMove`, verificar que `move` no sea vacío.
7. En `trainMove`, cambiar `student.moves.push(move)` por `student.moves.push({ move, date: new Date() })`.
8. En `winMatch`, verificar que el estudiante exista antes de incrementar `victories`. Si no existe, lanzar `Error`.
9. En `getStudents`, retornar una copia del array (`[...students]`) en vez de la referencia directa.
10. Agregar `Student` a `module.exports`.
11. Cambiar `var students` por `let students`.
12. En `index.js`, envolver las llamadas que pueden fallar en `try/catch` para demostrar el manejo de errores.
13. Ejecutar el programa y verificar que: (a) los estudiantes tienen todas las propiedades, (b) las validaciones lanzan errores claros, (c) el array externo no modifica el interno.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad |
|---|---|---|
| 1 | La clase `Student` tiene todas las propiedades requeridas en el constructor | BLOQUEANTE |
| 2 | `addStudent` crea instancias con `new Student()` (no objetos literales) | BLOQUEANTE |
| 3 | `addStudent` valida que `name` no sea vacío y lanza `Error` | BLOQUEANTE |
| 4 | `addStudent` valida que `beltLevel` sea un nivel permitido y lanza `Error` | BLOQUEANTE |
| 5 | `trainMove` valida que el estudiante exista y lanza `Error` si no | BLOQUEANTE |
| 6 | `trainMove` valida que `move` no sea vacío | BLOQUEANTE |
| 7 | `trainMove` agrega un objeto `{ move, date }` (no solo el string) | BLOQUEANTE |
| 8 | `winMatch` valida que el estudiante exista y lanza `Error` si no | BLOQUEANTE |
| 9 | `getStudents` retorna una copia del array (no la referencia directa) | BLOQUEANTE |
| 10 | Se exportan la clase `Student` y las 4 funciones en `module.exports` | BLOQUEANTE |
| 11 | `index.js` importa y usa el módulo correctamente | BLOQUEANTE |
| 12 | Las propiedades `victories` y `joinedDate` se inicializan correctamente | BLOQUEANTE |
| 13 | Uso de `let`/`const` en vez de `var` | NO BLOQUEANTE |
| 14 | `index.js` demuestra manejo de errores con `try/catch` | NO BLOQUEANTE |
| 15 | No hay código muerto (clases o funciones definidas pero no usadas) | NO BLOQUEANTE |
| 16 | Los mensajes de error son descriptivos y útiles | NO BLOQUEANTE |
| 17 | El código no tiene `console.log` de debugging residuales | NO BLOQUEANTE |
| 18 | Las funciones están correctamente nombradas según la consigna | NO BLOQUEANTE |
