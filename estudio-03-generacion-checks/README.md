# Estudio 03 — Generación de checks mediante Specification-Driven Development (SDD)

## Contexto

En PADIS, cada ejercicio se acompaña de un archivo de verificación automática (`check_<ejercicio>.py`) que evalúa la solución del estudiante contra criterios derivados de la consigna. Estos archivos (*checks*) constituyen el mecanismo central de retroalimentación de la plataforma: ejecutan validaciones determinísticas sobre el código entregado y producen resultados binarios (cumple / no cumple) asociados a puntajes y mensajes de retroalimentación.

La creación manual de checks presenta un costo significativo para el equipo docente. Requiere traducir los requisitos de la consigna en validaciones programáticas, utilizar correctamente la API de la librería `padislib`, mantener consistencia de estilo con los checks existentes y garantizar que las verificaciones no filtren información que el estudiante debe descubrir por sí mismo.

## Objetivo del estudio

Investigar si un agente de IA puede generar archivos de verificación automática (`check_*.py`) a partir de la consigna del ejercicio, utilizando un enfoque de **Specification-Driven Development (SDD)**: un conjunto de documentos que especifican los principios, restricciones, plantillas y la referencia de API que el agente debe respetar.

## Enfoque: Specification-Driven Development

En lugar de instruir al agente con un prompt abierto, se diseñó un ecosistema de especificaciones que delimitan su comportamiento:

| Documento | Propósito |
|-----------|-----------|
| **Constitución** (`01-constitucion/constitution.md`) | Principios vinculantes que gobiernan la generación de checks: derivación desde README, layout de ejercicios, estrategia de identificadores, trazabilidad, determinismo, política de feedback |
| **Plantilla de especificación** (`02-plantillas/spec-template.md`) | Estructura que el agente completa antes de implementar: requisitos extraídos, convenciones existentes, estrategia de selectores, llamadas PADIS planificadas |
| **Plantilla de tareas** (`02-plantillas/task-template.md`) | Fases de trabajo (preflight, implementación, calidad) con restricciones no negociables |
| **Referencia de API** (`03-api-reference/padis-checks-api.md`) | Superficie pública de `padislib` generada por introspección; el agente solo puede usar métodos documentados aquí |
| **Herramienta de generación** (`03-api-reference/gen_padis_api_spec.py`) | Script Python que genera la referencia de API por introspección de `padislib` |
| **Prompt base** (`04-prompt-base/base-prompt.md`) | Prompt raíz que el agente recibe al inicio de cada sesión de generación |

## Principios clave del enfoque

1. **README como fuente de verdad**: los checks se derivan exclusivamente de lo que dice la consigna (`README.md`) del ejercicio.

2. **No-modification policy**: el agente solo puede crear/modificar el archivo `check_*.py`. No puede tocar el README, archivos base ni ningún otro recurso.

3. **API validada**: el agente debe verificar que cada llamada a `padislib` exista en la referencia de API generada. No puede inventar métodos.

4. **No-solution leakage**: el feedback al estudiante no debe filtrar respuestas que este debe descubrir (tipos de input HTML, clases Bootstrap, valores de atributos, etc.).

5. **Convenciones canónicas**: si ya existe un check file, sus convenciones de estilo (grupos, títulos, scoring) son vinculantes. Si no existe, se derivan de ejercicios similares.

6. **Determinismo**: los checks deben ser reproducibles, sin acceso a red, sin dependencia de tiempo ni estado externo.

## Flujo de trabajo

```
┌─────────────────────────────────────────────────────┐
│  Docente solicita: /speckit.spec <ejercicio>        │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Fase 1: Preflight                                  │
│  • Lee README.md del ejercicio                      │
│  • Lee check existente (si hay) o busca referencia  │
│  • Inventaría archivos base                         │
│  • Valida llamadas PADIS contra la API reference    │
│  • Reporta "Teacher Action Needed" si corresponde   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Fase 2: Implementación                             │
│  • Genera/actualiza check_<ejercicio>.py            │
│  • Respeta convenciones del check existente         │
│  • Usa selectores derivados de archivos base        │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  Fase 3: Quality Pass                               │
│  • Verifica api.end() presente                      │
│  • Confirma trazabilidad README → checks            │
│  • Elimina solution leakage del feedback            │
│  • Valida todas las llamadas PADIS usadas           │
└─────────────────────────────────────────────────────┘
```

## Estructura de archivos

```
estudio-03-generacion-checks/
├── README.md                                  ← Este documento
├── 01-constitucion/
│   └── constitution.md                        ← Principios vinculantes (v1.5.0)
├── 02-plantillas/
│   ├── spec-template.md                       ← Plantilla de especificación por ejercicio
│   └── task-template.md                       ← Plantilla de tareas con fases
├── 03-api-reference/
│   ├── padis-checks-api.md                    ← Referencia de API generada
│   └── gen_padis_api_spec.py                  ← Script de generación por introspección
└── 04-prompt-base/
    └── base-prompt.md                         ← Prompt raíz del agente
```

## Relación con la tesis

Este estudio corresponde al tercer eje de experimentación con IA: el uso del modelo como **asistente docente en la creación de archivos de verificación automática**. A diferencia de los estudios 1 y 2, donde la IA opera como evaluador o solucionador, aquí se implementa efectivamente como parte del flujo de trabajo docente.

El enfoque SDD busca demostrar que, con especificaciones suficientemente precisas, un agente de IA puede producir checks que:

- respetan la política de no filtrar soluciones,
- utilizan correctamente la API de la librería,
- mantienen consistencia con los checks existentes,
- y son derivables de la consigna del ejercicio.
