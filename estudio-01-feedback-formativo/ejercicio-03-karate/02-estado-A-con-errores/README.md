# Estado A – Solución con errores intencionales

Este estado corresponde a una implementación **parcialmente correcta** construida para simular una entrega estudiantil con errores frecuentes vinculados al diseño de clases, validación y manejo de colecciones en JavaScript.

## Propósito del estado

Se utiliza como entrada del experimento baseline para analizar:

- la capacidad de la IA para detectar fallas de diseño y programación defensiva;
- la calidad de la retroalimentación formativa generada;
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

## Errores intencionales incluidos

La solución ejecuta parcialmente, pero presenta inconsistencias respecto a la consigna y al diseño esperado.  
Entre los errores introducidos deliberadamente se encuentran:

- la clase `Student` no incluye las propiedades `victories` ni `joinedDate`;
- `addStudent` crea objetos literales en vez de usar `new Student()`, dejando la clase como código muerto;
- ausencia total de validaciones en todas las funciones;
- `trainMove` no verifica existencia del estudiante (crashea con `undefined`);
- `trainMove` agrega solo el string del movimiento, no un objeto `{ move, date }`;
- `winMatch` no verifica existencia del estudiante e incrementa `victories` sobre `undefined` (produce `NaN`);
- `getStudents` retorna la referencia directa al array interno (sin encapsulación);
- la clase `Student` no se exporta en `module.exports`;
- uso de `var` en lugar de `let`/`const`.
