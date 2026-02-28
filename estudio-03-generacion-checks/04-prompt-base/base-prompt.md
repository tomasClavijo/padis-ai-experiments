# Prompt base del agente — Generación de checks

Este es el prompt raíz que el agente recibe al inicio de cada sesión de generación de checks. Define el contexto del repositorio, el objetivo de la tarea, los archivos que debe leer, las restricciones no negociables y el formato de salida esperado.

## Activación

El docente activa la generación con:

```
/speckit.spec {EXERCISE}
```

Donde `{EXERCISE}` es el nombre del ejercicio (e.g., `movie`, `karate`, `grocery`).

## Texto del prompt

```
EXERCISE = "{EXERCISE}"

/speckit.spec {EXERCISE}: create or update exercises/{EXERCISE}/check_{EXERCISE}.py

You are working inside this repository.

Goal:

Create or update: exercises/{EXERCISE}/check_{EXERCISE}.py

You MUST read before writing:

- exercises/{EXERCISE}/README.md
- all base files in exercises/{EXERCISE}/ (list them)
- docs/padis_checks_api.md
- the constitution file
- If exercises/{EXERCISE}/check_{EXERCISE}.py exists: treat it as canonical conventions
  baseline. If it does NOT exist: scan exercises/*/check_*.py and pick 1–3 reference
  exercises (prefer same exercise type). List which reference exercise(s) you used.

Hard constraints:

- Modify/create ONLY: exercises/{EXERCISE}/check_{EXERCISE}.py
- Do NOT modify README or base files. If needed for checkability, report
  "Teacher Action Needed".
- Derive requirements ONLY from exercises/{EXERCISE}/README.md
- Follow the constitution (identifier strategy, feedback policy, PADIS API validation).

Implementation rules:

- Match baseline check file style (groups/titles/scoring/hints patterns).
- Prefer flexible checks; only rely on ids/classes already present in base files or
  established by check file contract.
- Verify every PADIS call/decorator exists in docs/padis_checks_api.md.

Output format:

A) Preflight summary (base files, README sections→groups, PADIS calls, reference
   exercises, Teacher Action Needed)
B) Full final content of exercises/{EXERCISE}/check_{EXERCISE}.py
```

## Decisiones de diseño

| Decisión | Justificación |
|----------|---------------|
| Lectura obligatoria antes de escribir | Evita que el agente genere checks sin contexto; fuerza inspección del README, archivos base y API |
| Referencia a constitución | Vincula el prompt a los principios que gobiernan la calidad y restricciones de los checks |
| Output en dos partes (A + B) | Separa razonamiento (preflight) de implementación; permite al docente revisar el plan antes de aceptar el código |
| Constraint explícito de "no modificar README" | Previene que el agente simplifique el problema modificando la consigna del ejercicio |
| "Teacher Action Needed" como escape válido | Permite al agente comunicar bloqueos sin violar las restricciones |
