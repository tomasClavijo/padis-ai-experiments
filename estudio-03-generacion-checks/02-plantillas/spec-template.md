# Plantilla de especificación de checks por ejercicio

Estructura que el agente completa antes de implementar un check file. Garantiza que todos los requisitos estén identificados, las convenciones documentadas y las llamadas a la API validadas.

---

## Exercise Check Specification: [EXERCISE NAME]

- **Ejercicio**: `exercises/[exercise-name]/`
- **Creado**: [DATE]
- **Estado**: Draft

**Input**: Solicitud del docente: `"$ARGUMENTS"`

---

### Alcance y restricciones (no negociable)

- Este trabajo modifica/crea únicamente: `exercises/[exercise-name]/check_[exercise-name].py`
- El agente **no debe** modificar:
  - `exercises/[exercise-name]/README.md`
  - archivos base del ejercicio (HTML/CSS/JS/etc.)
  - ningún otro archivo del repositorio
- Los checks **deben** derivarse de `exercises/[exercise-name]/README.md`
- Check file existente (si lo hay) es canónico para convenciones/rigurosidad:
  `exercises/[exercise-name]/check_[exercise-name].py`
- Si el check file **no existe**, las convenciones se derivan de ejercicios existentes con `exercises/*/check_*.py`
  - Preferir el tipo de ejercicio más similar (HTML/JS/C#/plaintext/etc.)
  - Si no hay uno similar claro, preferir el check file más recientemente agregado/actualizado
  - El generador **debe** listar qué ejercicio(s) de referencia usó
- Solo usar llamadas/decoradores PADIS que existan en: `docs/padis_checks_api.md`

### Política de feedback (al estudiante)

- Default: omitir `@hints` a menos que las convenciones existentes lo requieran
- Permitido: recordatorios a nivel de requisito, punteros de alcance, restricciones estructurales, referencias al README
- Prohibido (a menos que ya esté en el README): respuestas de documentación como tipos de input HTML, nombres de clases Bootstrap/CSS, valores exactos de atributos/rangos, fragmentos de código/firmas

### Archivos revisados (obligatorio)

Lista de archivos inspeccionados antes de proponer cambios:

- [ ] `exercises/[exercise-name]/README.md`
- [ ] `exercises/[exercise-name]/check_[exercise-name].py` (si existe)
- [ ] Archivos base presentes en `exercises/[exercise-name]/` (listar explícitamente)
- [ ] `docs/padis_checks_api.md`

### Ejercicios de referencia para convenciones (obligatorio si no hay check file)

Si `exercises/[exercise-name]/check_[exercise-name].py` no existe:

- [ ] `exercises/<ref1>/check_<ref1>.py` — [por qué es buen baseline]
- [ ] `exercises/<ref2>/check_<ref2>.py` — [opcional]
- [ ] `exercises/<ref3>/check_<ref3>.py` — [opcional]

### Requisitos extraídos del README (fuente de verdad)

Capturar requisitos tal como aparecen en el README, agrupados por secciones. No inventar nuevos requisitos.

**[Título de sección del README 1]**

- R-001: [Paráfrasis del requisito; mantenerla cercana a la redacción del README]
- R-002: ...

**[Título de sección del README 2]**

- R-003: ...

### Convenciones del check file existente a preservar (obligatorio si existe)

Extraer convenciones de `check_[exercise].py` que deben permanecer consistentes:

- Formato de nombres de grupo (incluyendo emojis)
- Estilo de títulos (idioma, tono, puntuación)
- Escala de scoring y pesos típicos
- Si se usan hints (y si es así, su tono/especificidad)
- Identificadores/selectores ya establecidos
- Rutas de archivos esperadas (e.g., `index.html`)

### Estrategia de identificadores (obligatorio)

Para cada requisito, elegir una estrategia (en este orden de preferencia):

1. **Derivado**: de archivos base (ids/classes/estructura existentes)
2. **Flexible**: validar requisito sin requerir nuevos ids/classes
3. **Inventado**: requerir nuevo id/class/selector solo si es estrictamente necesario

| Req ID | Estrategia | Selectores/estructura a usar | Justificación |
|--------|-----------|------------------------------|---------------|
| R-001  |           |                              |               |

### Llamadas y decoradores PADIS a usar (verificar contra docs/padis_checks_api.md)

**Decoradores:**

- `padislib.api.decorators.group`
- `padislib.api.decorators.title`
- `padislib.api.decorators.score`
- `padislib.api.decorators.hints` (solo si las convenciones existentes lo permiten)

**Llamadas a la API de checks:**

- `api.[namespace].[method]`
- ...

### Plan de mapeo de checks (README → checks)

| Req ID | Título del check planificado | Namespace(s) PADIS | Notas |
|--------|------------------------------|--------------------| ------|
| R-001  |                              |                    |       |

### Teacher Action Needed (si hay)

Si un requisito no puede verificarse de forma confiable sin cambiar el README o los archivos base, listarlo aquí y explicar por qué. No aplicar los cambios.

- TA-001: [Cambio necesario] — [Por qué es requerido para verificación confiable]
