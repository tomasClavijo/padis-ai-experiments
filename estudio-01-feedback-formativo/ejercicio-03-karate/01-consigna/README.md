# Consigna – Sistema de Gestión de Dojo (Karate)

## Enunciado

Crear un módulo en JavaScript (Node.js) que implemente un sistema de gestión de dojo de karate.

1) En el archivo `src/karate.js`, crear una clase `Student` con las siguientes propiedades inicializadas en el constructor:
   - `name` (string)
   - `beltLevel` (string)
   - `moves` (array, inicializado vacío)
   - `victories` (number, inicializado en 0)
   - `joinedDate` (Date, basado en un timestamp recibido como parámetro, con valor por defecto `Date.now()`)

2) En el mismo archivo, implementar las siguientes funciones que operan sobre un array interno `students`:

   - `addStudent(name, beltLevel)`: crea un nuevo `Student` y lo agrega al array.
     - Validar que `name` no sea vacío.
     - Validar que `beltLevel` sea uno de: `"white"`, `"yellow"`, `"orange"`, `"green"`, `"blue"`, `"brown"`, `"black"`.
     - Lanzar `Error` si la validación falla.

   - `trainMove(name, move)`: busca al estudiante por nombre y agrega un objeto `{ move, date: new Date() }` a su array de movimientos.
     - Validar que el estudiante exista (lanzar `Error` si no).
     - Validar que `move` no sea vacío.

   - `winMatch(name)`: busca al estudiante por nombre e incrementa sus victorias.
     - Validar que el estudiante exista (lanzar `Error` si no).

   - `getStudents()`: retorna una **copia** del array de estudiantes.

3) Exportar la clase `Student` y las funciones `addStudent`, `trainMove`, `winMatch` y `getStudents` mediante `module.exports`.

4) En el archivo `src/index.js`, importar el módulo, agregar al menos 3 estudiantes, entrenar movimientos, registrar victorias y mostrar la información con `console.log`.

## Observación didáctica

La consigna busca evaluar especialmente:

- diseño de clases (constructor con inicialización completa de todas las propiedades),
- uso de la clase definida (crear instancias con `new` en lugar de objetos literales),
- validación de datos en funciones públicas (programación defensiva),
- manejo de errores (lanzar excepciones ante entradas inválidas, no fallar silenciosamente),
- encapsulación (no exponer el array interno directamente, retornar copias),
- uso correcto de colecciones (`find`, `push`, objetos compuestos),
- modularización (`module.exports` / `require`).
