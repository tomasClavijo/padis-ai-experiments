# Estudio 1 – IA como agente de retroalimentación formativa

Este estudio analiza el uso de modelos de IA como **agentes de retroalimentación formativa** sobre soluciones de estudiantes en el contexto de práctica de Ingeniería de Software dentro de la plataforma PADIS.

El objetivo es observar:

- la capacidad del modelo para **identificar aciertos e incumplimientos conceptuales**,
- la **calidad pedagógica de la devolución** generada,
- su **consistencia en procesos de re-evaluación**,
- y su comportamiento frente a **soluciones correctas (ausencia de falsos positivos)**.

El foco no está en la generación automática de código, sino en la producción de **feedback accionable, justificado y alineado con criterios docentes**, manteniendo restricciones explícitas de *no-solution compliance*.

---

## Diseño experimental

Para cada ejercicio se analizan tres situaciones:

1. **Estado A – solución con errores intencionales**  
   Permite evaluar la capacidad diagnóstica del modelo y la pertinencia de las observaciones.

2. **Estado B – post-fix**  
   Versión corregida exclusivamente a partir de la retroalimentación obtenida en el estado anterior.  
   Se utiliza para analizar:
    - reconocimiento de mejoras,
    - reducción de falsos positivos,
    - consistencia del feedback.

3. **Estado C – solución correcta**  
   Implementación que cumple la consigna.  
   Permite observar:
    - validación de cumplimiento,
    - mantenimiento de retroalimentación formativa sin “forzar” errores.

---

## Estructura de los ejercicios

Cada ejercicio se organiza siguiendo el flujo experimental:

```text
ejercicio-X-nombre/
│
├── 01-consigna/
├── 02-estado-A-con-errores/
├── 03-estado-B-post-fix/
├── 04-estado-C-solucion-correcta/
├── 05-prompts/
└── 06-outputs-modelo/
```


### Descripción de los componentes

- **01-consigna/**  
  Enunciado original del ejercicio.

- **02-estado-A-con-errores/**  
  Implementación con errores conceptuales típicos utilizados para el análisis inicial.

- **03-estado-B-post-fix/**  
  Solución corregida a partir de la retroalimentación generada por la IA.

- **04-estado-C-solucion-correcta/**  
  Implementación que cumple los requisitos de la consigna.

- **05-prompts/**  
  Consignas utilizadas para definir el rol del modelo y las restricciones de la interacción.

- **06-outputs-modelo/**  
  Respuestas completas generadas por la IA.

---

## Esquema de salida del modelo

En todos los experimentos se solicita el mismo formato de respuesta con el fin de mantener condiciones comparables:

- resumen general,
- hallazgos priorizados,
- preguntas guía,
- plan de próximos pasos,
- checklist transferible.

---

## Asignaturas y contexto

Los ejercicios utilizados en este estudio pertenecen a distintas asignaturas de la Cátedra de IS de Universidad ORT Uruguay, en particular:

- Fundamentos de Ingeniería de Software (FIS)
- Diseño de Aplicaciones 1 (DA1)

Esto permite observar el comportamiento del modelo en contextos de práctica reales y con consignas de diferente naturaleza.

---

## Relación con la tesis

En el documento de tesis se presenta un **caso representativo en detalle**, mientras que los restantes se incluyen como evidencia complementaria.

Este directorio contiene la totalidad de los artefactos correspondientes al Estudio 1.