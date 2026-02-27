# Estado B – Solución con errores intencionales

Este estado corresponde a una implementación **más cercana al diseño esperado que el Estado A**, pensada para simular una entrega estudiantil “mejorada”, pero que aún conserva **errores frecuentes y más sutiles** vinculados a POO.  
La solución **compila y ejecuta correctamente**, y evita varios problemas estructurales del Estado A, pero sigue presentando desajustes conceptuales respecto a la consigna.

---

## Propósito del estado

Se utiliza como segunda entrada experimental para analizar:

- la capacidad de la IA para detectar errores **menos evidentes** en herencia y polimorfismo;
- la calidad de la retroalimentación cuando el código está “casi correcto”;
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

---

## Mejoras respecto al Estado A

A diferencia del Estado A, este estado:

- utiliza `virtual/override` en lugar de `new`, respetando el mecanismo de sobrescritura;
- mantiene comportamiento específico en cada subtipo (`Auto` y `Camioneta`);
- encapsula el estado del objeto mediante propiedades;
- compila sin errores y ejecuta de forma consistente;
- elimina el error estructural más grave: el ocultamiento accidental del método base.

Estas mejoras hacen que la solución sea **funcionalmente correcta desde el punto de vista del runtime**, pero aún incorrecta desde el punto de vista del diseño orientado a objetos esperado por la consigna.

---

## Errores intencionales incluidos

La solución sigue presentando inconsistencias deliberadas para permitir el análisis de feedback formativo:

- presencia de lógica por tipo (`is`) en el programa cliente, a pesar de contar con polimorfismo funcional;
- sobrecarga innecesaria de `Encender(string extra)` en `Auto`, que introduce ambigüedad de responsabilidad y no forma parte del modelo del dominio;
- método base `Vehiculo.Encender` con comportamiento concreto cuando el diseño esperado requiere delegar completamente en las subclases;
- uso del polimorfismo de forma incompleta (se lo implementa correctamente en las clases, pero no se lo aprovecha en el cliente).

---

## Naturaleza de los errores

A diferencia del Estado A —donde los problemas impedían el uso correcto del polimorfismo—, en este estado:

- el polimorfismo **existe pero no se utiliza adecuadamente**;
- los errores son **de diseño y modelado**, no de compilación ni de sintaxis;
- el código puede parecer correcto para un estudiante que está en transición entre herencia básica y polimorfismo real.

Esto lo convierte en un escenario especialmente útil para evaluar la capacidad de la IA de generar **retroalimentación conceptual y no meramente sintáctica**.

