# Estudio 02 — IA como solucionador de ejercicios

## Objetivo

Evaluar la capacidad de modelos de lenguaje para producir soluciones a ejercicios prácticos de programación, analizando la completitud funcional, la calidad del código generado y su valor pedagógico.

## Modalidades de interacción

| Modalidad | Descripción | Ejercicios |
|-----------|-------------|------------|
| **Step-by-step** | Instrucciones enviadas de forma incremental, un requerimiento por turno | Viajes, Movie (HTML/Bootstrap) |
| **Single-shot** | Totalidad de requerimientos enviados en un único prompt | Grocery (JavaScript), Movie (HTML/Bootstrap) |

## Experimentos

| Exp. | Modalidad | Modelo | Ejercicio |
|------|-----------|--------|-----------|
| 1 | Step-by-step | GPT-Codex 5.1 High | Viajes |
| 2 | Step-by-step | Google Gemini 3 Pro | Viajes |
| 3 | Step-by-step | Anthropic Claude 3.5 Sonnet | Viajes |
| 4 | Single-shot | GPT-Codex 5.2 | Grocery |
| 5 | Single-shot | Google Gemini 3 Flash | Grocery |
| 6 | Single-shot | Anthropic Claude 3.5 Sonnet | Grocery |
| 7 | Step-by-step | GPT-Codex 5.1 High | Movie |
| 8 | Step-by-step | Google Gemini 3 Pro | Movie |
| 9 | Step-by-step | Anthropic Claude 3.5 Sonnet | Movie |
| 10 | Single-shot | GPT-Codex 5.2 | Movie |
| 11 | Single-shot | Google Gemini 3 Flash | Movie |
| 12 | Single-shot | Anthropic Claude 3.5 Sonnet | Movie |

**Entorno**: IDE Cursor para todos los experimentos.

## Estructura

```
estudio-02-generacion-soluciones/
├── README.md
├── ejercicio-01-viajes/
│   ├── README.md                          ← Consigna
│   └── step-by-step/
│       ├── gpt/                           ← Solución GPT (index.html, styles.css)
│       ├── gemini/                        ← Solución Gemini
│       └── claude-sonnet/                 ← Solución Claude Sonnet
├── ejercicio-02-grocery/
│   ├── README.md                          ← Consigna
│   └── single-shot/
│       ├── gpt/                           ← Solución GPT (domain/, index.html, main.js)
│       ├── gemini/                        ← Solución Gemini
│       └── claude-sonnet/                 ← Solución Claude Sonnet
└── ejercicio-03-movie/
    ├── README.md                          ← Consigna
    ├── step-by-step/
    │   ├── gpt/                           ← Solución GPT (index.html, styles.css)
    │   ├── gemini/                        ← Solución Gemini
    │   └── claude-sonnet/                 ← Solución Claude Sonnet
    └── single-shot/
        ├── gpt/                           ← Solución GPT (index.html, styles.css)
        ├── gemini/                        ← Solución Gemini
        └── claude-sonnet/                 ← Solución Claude Sonnet
```

Cada carpeta de modelo contiene los archivos de código generados como solución al ejercicio, reflejando las diferencias observadas entre modelos.
