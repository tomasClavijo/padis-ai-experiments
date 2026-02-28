# Plantilla de tareas para generación de checks

Lista de tareas estructurada en fases que el agente sigue durante la generación o actualización de un check file.

---

## Tasks: [EXERCISE NAME]

- **Target**: `exercises/[exercise-name]/check_[exercise-name].py`
- **Inputs**:
  - `exercises/[exercise-name]/README.md`
  - `exercises/[exercise-name]/check_[exercise-name].py` (si existe)
  - Archivos base en `exercises/[exercise-name]/`
  - `docs/padis_checks_api.md`

### Restricciones no negociables

- Modificar/crear únicamente `exercises/[exercise-name]/check_[exercise-name].py`
- No modificar README ni archivos base
- Requisitos provienen únicamente del README
- Check file existente es canónico para convenciones/rigurosidad (si existe)
- Si el check file no existe, derivar convenciones de ejercicios existentes
- Solo usar llamadas/decoradores PADIS presentes en `docs/padis_checks_api.md`
- Política de texto al estudiante:
  - Permitido: recordatorios a nivel de requisito, punteros de alcance, restricciones estructurales, referencias al README
  - Prohibido (a menos que esté en el README): respuestas de documentación (tipos de input HTML, clases Bootstrap/CSS, valores exactos, fragmentos de código)

---

### Fase 1: Preflight (completar antes de editar)

- [ ] **T001** Leer `exercises/[exercise-name]/README.md` y extraer requisitos verificables agrupados por secciones
- [ ] **T002** Leer `exercises/[exercise-name]/check_[exercise-name].py` (si existe) y documentar convenciones a preservar (grupos/títulos/scores/hints/rigurosidad/rutas)
- [ ] **T002b** Si el check file no existe:
  - Escanear `exercises/*/check_*.py`
  - Seleccionar 1–3 ejercicios de referencia (preferir mismo tipo)
  - Registrar convenciones a adoptar
- [ ] **T003** Inventariar archivos base en `exercises/[exercise-name]/` e identificar selectores/estructura existentes para derivar
- [ ] **T004** Abrir `docs/padis_checks_api.md` y listar los métodos/decoradores PADIS exactos a usar
- [ ] **T005** Validar que cada llamada/decorador PADIS planificado exista en la referencia (sin APIs inventadas)
- [ ] **T006** Si algún requisito no puede verificarse de forma confiable sin cambiar README/archivos base, escribir lista de **Teacher Action Needed** (no cambiar archivos)

### Fase 2: Implementar checks (solo check_[exercise].py)

Implementar en el estilo existente. Preferir modificar/extender checks existentes sobre reescribirlos.

**[Título de sección del README 1]**

- [ ] **T101** Actualizar/agregar checks para: [Req IDs...] en `exercises/[exercise-name]/check_[exercise-name].py`
  - Preservar convenciones de grupo, títulos, scoring
  - Usar selectores derivados/flexibles cuando sea posible

**[Título de sección del README 2]**

- [ ] **T102** Actualizar/agregar checks para: [Req IDs...] en `exercises/[exercise-name]/check_[exercise-name].py`

### Fase 3: Quality Pass

- [ ] **T201** Confirmar que `api.end()` existe exactamente una vez al final del archivo
- [ ] **T202** Confirmar que no se hicieron ediciones prohibidas (README/archivos base intactos)
- [ ] **T203** Confirmar que los checks mapean a requisitos del README (comentarios de trazabilidad donde corresponda)
- [ ] **T204** Confirmar que el texto al estudiante sigue la política:
  - Mantener recordatorios a nivel de requisito / punteros de alcance / restricciones estructurales
  - Remover respuestas de documentación que no estén en el README
- [ ] **T205** Confirmar que cada llamada PADIS usada existe en `docs/padis_checks_api.md`
- [ ] **T206** Escanear títulos/hints/mensajes en el check file y remover filtración de soluciones no establecida en el README:
  - Tipos de input HTML específicos
  - Nombres de clases Bootstrap/CSS
  - Valores exactos de atributos/rangos
  - Fragmentos de código/firmas
