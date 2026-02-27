# Estado A – Solución con errores intencionales.

Este estado corresponde a una implementación **parcialmente correcta** construida para simular una entrega estudiantil con errores frecuentes vinculados al uso de herencia y polimorfismo.

## Propósito del estado

Se utiliza como entrada del experimento baseline para analizar:

- la capacidad de la IA para detectar fallas conceptuales de POO;
- la calidad de la retroalimentación formativa generada;
- el cumplimiento de las restricciones de *no-solution compliance*;
- la generación de observaciones reutilizables en forma de checklist.

## Errores intencionales incluidos

La solución compila y ejecuta, pero presenta inconsistencias respecto a la consigna y al diseño esperado.  
Entre los errores introducidos deliberadamente se encuentran:

- sobrecarga de `MostrarInfo` en `Circulo` (parámetro `string formato`) en lugar de sobrescritura;
- ocultamiento del método en `TrianguloEquilatero` y `Rectangulo` mediante el uso de `new`;
- implementación de comportamiento en `Figura.MostrarInfo()` cuando la consigna establece que no debe tenerlo;
- fórmula incorrecta del perímetro en `Rectangulo` (`base × altura` en lugar de `2 × (base + altura)`);
- ausencia total de validación de dimensiones en constructores;
- ruptura del polimorfismo evidenciada por la necesidad de lógica por tipo (`is/as`) en el programa cliente.
