# Estado B – Solución con errores intencionales

Este estado corresponde a una implementación **más cercana al diseño esperado que el Estado A**, pensada para simular una entrega estudiantil "mejorada", pero que aún conserva **errores frecuentes y más sutiles** vinculados al diseño de clases y la programación defensiva en JavaScript.  
La solución **ejecuta sin crashear**, y evita varios problemas estructurales del Estado A, pero sigue presentando desajustes conceptuales respecto a la consigna.

---

## Propósito del estado

Se utiliza como segunda entrada experimental para analizar:

- la capacidad de la IA para detectar errores **menos evidentes** en diseño de clases y validación;
- la calidad de la retroalimentación cuando el código está "casi correcto";
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

---

## Mejoras respecto al Estado A

A diferencia del Estado A, este estado:

- utiliza `new Student()` en vez de objetos literales;
- la clase `Student` incluye todas las propiedades requeridas (`victories`, `joinedDate`);
- `addStudent` valida que el nombre no sea vacío;
- `trainMove` verifica existencia del estudiante antes de operar;
- `trainMove` agrega un objeto `{ move, date }` correctamente;
- `winMatch` verifica existencia del estudiante;
- usa `let` en vez de `var`;
- exporta la clase `Student`;
- ejecuta sin errores de runtime.

---

## Errores intencionales incluidos

La solución sigue presentando inconsistencias deliberadas para permitir el análisis de feedback formativo:

- `addStudent` no valida que el `beltLevel` sea uno de los niveles permitidos (acepta cualquier string);
- `trainMove` y `winMatch` fallan silenciosamente cuando el estudiante no existe (no lanzan `Error`);
- `trainMove` no valida que el movimiento no sea vacío;
- `getStudents` retorna la referencia directa al array interno (sin encapsulación);
- no se impide agregar estudiantes con nombres duplicados.

---

## Naturaleza de los errores

A diferencia del Estado A —donde los problemas causaban crasheos y datos corruptos—, en este estado:

- el código **ejecuta sin errores de runtime**;
- los errores son **de diseño y robustez**, no de sintaxis ni de crasheo;
- el código puede parecer correcto para un estudiante que recién incorpora validaciones.

Esto lo convierte en un escenario especialmente útil para evaluar la capacidad de la IA de generar **retroalimentación sobre programación defensiva y no meramente sobre errores de ejecución**.
