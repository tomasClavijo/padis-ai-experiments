# Ejercicio 06 — Evaluación por rúbrica vía API

## Objetivo

Los experimentos anteriores (ejercicios 01–05) utilizaron la interfaz conversacional de Claude para generar retroalimentación formativa abierta. Aunque los resultados fueron conceptualmente sólidos, se observaron dos limitaciones recurrentes:

1. **Verbosidad excesiva**: las respuestas incluían secciones extensas (resumen, hallazgos, preguntas guía, próximos pasos, checklist) incluso cuando la solución era correcta.
2. **Falsos positivos en soluciones correctas**: el modelo, al operar sin criterios cerrados, tendía a inventar observaciones para justificar una respuesta no vacía.

Este ejercicio propone un enfoque alternativo: **pasar la rúbrica de evaluación directamente al modelo** y pedirle que actúe exclusivamente como verificador. El modelo recibe una lista numerada de criterios y debe reportar únicamente los que no se cumplen. Si todos se cumplen, debe devolver la cadena `SIN ERRORES`.

## Hipótesis

Al acotar la tarea a una verificación cerrada (criterios explícitos, formato binario cumple/no-cumple), el modelo debería:

- Eliminar falsos positivos en soluciones correctas.
- Producir respuestas significativamente más breves.
- Mantener precisión en la detección de errores reales.

## Diseño del experimento

### Ejercicio base

Se reutiliza el **ejercicio 01 — POO Vehículos** (C# / .NET 10), que cuenta con estados previamente documentados:

- **Estado A**: solución con errores intencionales (un solo proyecto, `Encender()` con comportamiento en la base, uso de `new` y sobrecarga en lugar de `override`, lógica por tipo con `is/as`).
- **Estado C**: solución completamente correcta (dos proyectos, clase abstracta, `override`, polimorfismo puro).

### Rúbrica

Se diseñó una rúbrica de **13 criterios** derivados de la consigna y los conceptos evaluados. Cada criterio es verificable por lectura estática del código. Ver [`rubrica.md`](rubrica.md).

### Prompts

- **System prompt** ([`system_prompt.md`](system_prompt.md)): define el rol de verificador, el formato de entrada (consigna + rúbrica + código) y las reglas estrictas de salida.
- **User prompt**: concatenación de la consigna, la rúbrica y el código del estudiante. Se construye programáticamente en el script.

### Modelo y parámetros

| Parámetro    | Valor                       |
|--------------|-----------------------------|
| Modelo       | `claude-sonnet-4-20250514`  |
| max_tokens   | 1024                        |
| temperature  | default (1.0)               |

### Ejecución

Dos llamadas a la API de Anthropic:

1. **Estado A** (solución con errores) → se esperan criterios no cumplidos.
2. **Estado C** (solución correcta) → se espera `SIN ERRORES`.

## Resultados

### Estado A — Solución con errores

**Tokens**: 1498 entrada / 149 salida

```
#1  — NO CUMPLE — Un solo proyecto, no dos separados
#4  — NO CUMPLE — Encender() tiene comportamiento, no está vacío
#5  — NO CUMPLE — Encender() no está marcado como virtual/abstract
#8  — NO CUMPLE — Auto usa sobrecarga, Camioneta usa new
#9  — NO CUMPLE — Auto tiene firma diferente con parámetro extra
#10 — NO CUMPLE — Mensajes no coinciden con especificación exacta
#13 — NO CUMPLE — Usa is/as para decidir comportamiento
```

**7 de 13 criterios** identificados como no cumplidos. Todos son errores reales presentes en el código. **Cero falsos positivos.**

Los 6 criterios restantes (#2, #3, #6, #7, #11, #12) efectivamente se cumplen en el Estado A:

| # | Criterio | Verificación |
|---|----------|-------------|
| 2 | Referencia entre proyectos | N/A (hay un solo proyecto, el error está capturado en #1) |
| 3 | Propiedades `cantidadPuertas` y `colorChasis` | Presentes en `Vehiculo.cs` |
| 6 | `Auto` y `Camioneta` heredan de `Vehiculo` | Correcto en ambas clases |
| 7 | Constructores delegan al base | Correcto (`: base(...)`) |
| 11 | Se usa `List<Vehiculo>` | Correcto en `Program.cs` |
| 12 | Recorrido polimórfico | Existe un `foreach` polimórfico (aunque luego se agrega otro con `is/as`) |

### Estado C — Solución correcta

**Tokens**: 1422 entrada / 8 salida

```
SIN ERRORES
```

El modelo devolvió exactamente la cadena esperada. **Cero falsos positivos. Cero texto adicional.**

## Análisis comparativo

| Métrica | Exp. anterior (sin rúbrica) | Este experimento (con rúbrica) |
|---------|----------------------------|-------------------------------|
| Tokens salida — Estado A | 167 | 149 |
| Tokens salida — Estado C | 178 | **8** |
| Falsos positivos — Estado A | 0 | 0 |
| Falsos positivos — Estado C | **5** | **0** |
| Formato de salida | Variable, con líneas largas | Estricto, una línea por criterio |

La mejora más significativa se observa en el **Estado C**: el enfoque anterior sin rúbrica produjo 5 falsos positivos marcados como CRÍTICO; el enfoque con rúbrica devolvió `SIN ERRORES` en 8 tokens.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Este documento |
| `system_prompt.md` | System prompt utilizado |
| `rubrica.md` | Rúbrica de 13 criterios |
| `run_experiment.py` | Script de ejecución |
| `01-output-estado-A.md` | Resultado para Estado A (con errores) |
| `02-output-estado-C.md` | Resultado para Estado C (correcto) |

## Reproducción

```bash
pip install anthropic
set ANTHROPIC_API_KEY=<clave>
py run_experiment.py
```
