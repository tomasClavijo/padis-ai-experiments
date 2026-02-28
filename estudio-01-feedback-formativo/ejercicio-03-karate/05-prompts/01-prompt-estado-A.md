Actuá como DOCENTE/TUTOR de Programación en JavaScript.

Vas a evaluar la solución del estudiante utilizando el CÓDIGO ACTUAL del proyecto (archivos abiertos en el repositorio). No ejecutes el programa: basate únicamente en la lectura del código.

**CONSIGNA DEL EJERCICIO**

Crear un módulo en JavaScript (Node.js) que implemente un sistema de gestión de dojo de karate.

1) En el archivo `src/karate.js`, crear una clase `Student` con las siguientes propiedades inicializadas en el constructor:
   - `name` (string)
   - `beltLevel` (string)
   - `moves` (array, inicializado vacío)
   - `victories` (number, inicializado en 0)
   - `joinedDate` (Date, basado en un timestamp recibido como parámetro, con valor por defecto `Date.now()`)

2) Implementar las siguientes funciones que operan sobre un array interno `students`:
   - `addStudent(name, beltLevel)`: crea un nuevo `Student` y lo agrega al array.
     - Validar que `name` no sea vacío.
     - Validar que `beltLevel` sea uno de: "white", "yellow", "orange", "green", "blue", "brown", "black".
     - Lanzar `Error` si la validación falla.
   - `trainMove(name, move)`: busca al estudiante por nombre y agrega un objeto `{ move, date: new Date() }` a su array de movimientos.
     - Validar que el estudiante exista (lanzar `Error` si no).
     - Validar que `move` no sea vacío.
   - `winMatch(name)`: busca al estudiante por nombre e incrementa sus victorias.
     - Validar que el estudiante exista (lanzar `Error` si no).
   - `getStudents()`: retorna una copia del array de estudiantes.

3) Exportar la clase `Student` y las funciones `addStudent`, `trainMove`, `winMatch` y `getStudents` mediante `module.exports`.

4) En `src/index.js`, importar el módulo, agregar al menos 3 estudiantes, entrenar movimientos, registrar victorias y mostrar la información.

La consigna evalúa especialmente:
- diseño de clases (constructor con inicialización completa),
- uso de la clase definida (crear instancias con `new`),
- validación de datos en funciones públicas (programación defensiva),
- manejo de errores (lanzar excepciones, no fallar silenciosamente),
- encapsulación (retornar copias, no referencias internas),
- uso correcto de colecciones (`find`, `push`, objetos compuestos),
- modularización (`module.exports` / `require`).

**RESTRICCIONES OBLIGATORIAS**

- NO reescribas el código del proyecto.
- NO pegues una versión corregida ni la solución final.
- NO entregues la salida esperada del programa.
- NO propongas bloques de código listos para copiar/pegar.
- Si necesitás ilustrar algo, usá como máximo 1–3 líneas aisladas y no resolutivas.
- No hagas refactors completos: solo guía pedagógica.

**TAREA**

Revisá el código como si fueras un docente corrigiendo una entrega.

1) Marcá aciertos reales (mínimo 2).

2) Detectá errores conceptuales y de implementación relacionados con:
- diseño de clases (constructor, propiedades),
- uso de `new` vs objetos literales,
- validación de datos,
- manejo de errores (throw vs crash vs fallo silencioso),
- encapsulación (copia vs referencia),
- uso de colecciones (find, push, estructura de datos),
- modularización (exports/imports),
- código muerto.

3) Verificá el cumplimiento de la consigna:
- clase `Student` con todas las propiedades requeridas,
- `addStudent` crea instancias con `new Student()`,
- validación de nombre y nivel de cinturón en `addStudent`,
- `trainMove` agrega `{ move, date }` y valida existencia del estudiante,
- `winMatch` valida existencia del estudiante,
- `getStudents` retorna copia del array,
- se exportan todas las funciones y la clase.

4) Priorizá las observaciones en:
- CRÍTICOS (bloqueantes)
- MEJORAS (no bloqueantes)

5) Guiá sin resolver:
- pistas concretas,
- preguntas de reflexión,
- próximos pasos accionables.

6) Generá un checklist reutilizable para corregir otros ejercicios similares.

**FORMATO DE SALIDA (OBLIGATORIO)**

1) Resumen (5–7 líneas)
   - estado general
   - mínimo 2 aciertos reales

2) Hallazgos priorizados

CRÍTICOS (bloqueantes) y MEJORAS (no bloqueantes).

Para cada hallazgo indicar:

a) Dónde ocurre (archivo / función / línea)  
b) Síntoma observable  
c) Concepto implicado  
d) Por qué está mal o incompleto (explicación docente)  
e) Pista concreta (qué revisar) SIN dar la solución  
f) Pregunta de chequeo  

3) Preguntas guía para el estudiante (5–10)

4) Plan de próximos pasos (8–15 ítems verificables)

5) Checklist reutilizable de corrección docente  
(12–20 criterios marcando BLOQUEANTE vs NO BLOQUEANTE)

**CRITERIO DE CALIDAD**

- Evitá falsos positivos: si algo está bien, no lo critiques.
- Si algo no se puede confirmar sin ejecutar, indicá qué evidencia habría que observar.
- Separá claramente errores de mejoras opcionales.
- Mantené tono docente: claro, firme y respetuoso.
- No des la solución.
