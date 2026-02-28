# Check-Toolkit Constitution

Documento vinculante que establece los principios, restricciones y estándares de calidad para la generación y mantenimiento de archivos de verificación automática (*checks*) en PADIS.

**Versión**: 1.5.0 | **Ratificado**: 2026-02-11 | **Última enmienda**: 2026-02-11

---

## Principios fundamentales

### I. README-Driven Requirements (fuente de verdad)

Para cada ejercicio, los requisitos autoritativos son las instrucciones al estudiante en:

```
exercises/<name>/README.md
```

Los checks **deben** derivarse de lo que establece el README.

El archivo de verificación **no debe** imponer requisitos que no estén presentes en el README, excepto cuando:

- se mantiene compatibilidad con un contrato de check existente ya publicado para ese ejercicio, o
- se imponen restricciones técnicas necesarias implícitas en el README (e.g., "Incluir un campo Director" implica un input y un label asociado), siempre que la restricción sea razonable y documentada.

Las afirmaciones no verificables del README (e.g., "hacerlo más lindo") se tratan como guía y **no deben** convertirse en checks estrictos a menos que el README provea criterios explícitos y medibles.

### II. Exercise Pairing and Layout (no negociable)

Cada ejercicio vive enteramente en su propia carpeta:

```
exercises/<name>/README.md
exercises/<name>/check_<name>.py
```

más los archivos base del ejercicio (ver Principio III).

El check file **debe** ubicarse en `exercises/<name>/check_<name>.py` y **debe** apuntar únicamente a los archivos/recursos de ese ejercicio.

No se introducen archivos adicionales de requisitos docentes, directivas ni archivos de metadata como parte del flujo de trabajo.

### III. Exercise Base Files Are First-Class (recomendado)

Los ejercicios **deberían** incluir archivos base en `exercises/<name>/` apropiados al tipo de ejercicio. Ejemplos:

- **Ejercicios web/UI**: `index.html`, `styles.css`, assets (imágenes/íconos), `script.js` opcional
- **Ejercicios JavaScript/funcionalidad**: módulos `.js`, fixtures de test, inputs de ejemplo
- **Otros tipos**: cualquier scaffolding mínimo requerido para partir de una base conocida

Los archivos base reducen ambigüedad, estabilizan checks, proveen onboarding consistente al estudiante y dan al check file estructura concreta para validar.

Cuando existen archivos base, los checks **deberían** validar cambios contra estos archivos (en lugar de asumir un punto de partida en blanco).

### IV. Padislib-First, Consistent Check Shape

La lógica de checks **debería** usar las APIs y helpers de `padislib` donde estén disponibles.

El patrón estándar es:

```python
api = padisapi()

# checks como funciones decoradas con @group, @title, @score, @hints

api.end()
```

La lógica custom se permite solo cuando:

- `padislib` no tiene un helper adecuado, o
- usar `padislib` reduciría significativamente la claridad/robustez.

Cuando se usa lógica custom, **debe** ser: determinística, mínima, bien comentada y aislada en funciones helper dentro del check file.

### V. Identifier and Selector Strategy

Los READMEs típicamente no especifican ids/classes/selectors. El check file **debe** adoptar una estrategia explícita por requisito, priorizando en este orden:

1. **Derivar de archivos base**: preferir ids/classes/estructura que ya existen en los archivos starter/base.
2. **Validación flexible**: preferir checks que validen comportamiento/estructura sin requerir un nuevo id/class específico.
3. **Inventar identificadores solo cuando sea necesario**: requerir que el estudiante introduzca un id/class/selector específico se permite, pero **debería** ser infrecuente.

Si se usa (3), el check file **debe**: mantener el requisito mínimo, asegurar que sea descubrible por el estudiante y preferir derivar el identificador de una convención consistente.

### VI. Trazabilidad: cada check mapea al README

Cada check **debe** mapear claramente a una tarea/afirmación del README, idealmente usando el título de la sección del README y una paráfrasis breve.

La agrupación de checks **debería** reflejar la estructura del README ("Parte A / B / C"), pero el check file puede fusionar/dividir checks cuando mejora el feedback, siempre que la trazabilidad se mantenga clara.

### VII. Determinístico, Offline, seguro para repo del estudiante

Los checks **deben** ser determinísticos y reproducibles:

- Sin acceso a red.
- Sin dependencia de tiempo, aleatoridad, servicios externos o estado de máquina.
- Evitar checks inestables a menos que el ejercicio lo requiera explícitamente.

Los checks **deben** ser seguros para ejecutar sobre entregas no confiables de estudiantes:

- No ejecutar código arbitrario del estudiante a menos que el ejercicio lo requiera explícitamente y se haga mediante mecanismos controlados.
- Preferir inspección estática (parsing HTML/CSS/JS, checks de DOM, checks de accesibilidad, checks de repositorio).

### VIII. Consistencia con contratos de ejercicios existentes

Cuando un ejercicio ya tiene un check file, las actualizaciones **deben**:

- preservar la semántica de requisitos existentes a menos que el README cambie, y
- evitar romper expectativas del estudiante sin actualizar el README acorde.

### IX. Check file existente como referencia canónica

Para un ejercicio existente, `exercises/<name>/check_<name>.py` es la referencia canónica para:

- convenciones de nombres y agrupación (`@group`, uso de emojis, títulos),
- estrategia de scoring y estilo de mensajes,
- qué se considera rigurosidad aceptable,
- nombres de archivos/rutas esperados por los checks.

Si un ejercicio **no tiene** check file, el generador **debe**:

- derivar convenciones de ejercicios existentes que **sí** tengan check files,
- preferir el tipo de ejercicio más similar,
- listar qué ejercicio(s) de referencia usó como fuente de convenciones.

### X. PADIS API Reference es obligatoria (no inventar llamadas)

El repositorio incluye una referencia de API generada:

```
docs/padis_checks_api.md
```

Al generar o actualizar checks:

- Solo usar namespaces y métodos de PADIS que **existan** en `docs/padis_checks_api.md`.
- Solo usar decoradores que **existan** en la referencia.
- Si una llamada necesaria no existe, **no inventarla**. En su lugar: usar una llamada alternativa existente, implementar un fallback determinístico, o proponer un cambio a `padislib`.

### XI. Teacher-Only Changes (alcance de ediciones automáticas)

El agente solo modificará o creará el check file cuando el docente lo solicite explícitamente:

```
exercises/<name>/check_<name>.py
```

El agente **no debe** modificar:

- `exercises/<name>/README.md`
- archivos base del ejercicio (HTML/CSS/JS/etc.)
- ningún otro archivo del repositorio

Si implementar un check robusto requiere cambios en README o archivos base, el agente **debe** listarlos como **Teacher Action Needed** y explicar por qué, pero **no debe** aplicar esos cambios.

---

## Estándares de calidad

### Feedback y guía al estudiante

"No-spoiler" no significa vago. El feedback al estudiante **debería** ser claro sobre qué requisito falló y **puede** incluir punteros de alcance y restricciones estructurales. **No debe** revelar respuestas de documentación que no estén ya en el README.

**Permitido** en feedback al estudiante (títulos/mensajes/hints):

- Reformular el requisito a alto nivel (qué falta).
- Apuntar a la sección relevante del README.
- Punteros de alcance ("verificá los campos X e Y", "revisá la Parte B").
- Restricciones estructurales ("la label debe estar asociada a su input").
- Mencionar hooks de evaluación (ids/classes/selectors) cuando se derivan de archivos base o convenciones establecidas.

**Prohibido** (no debe aparecer en texto visible al estudiante):

- Tipos de input HTML específicos (e.g., `type="color"`, `type="email"`).
- Nombres de clases Bootstrap/CSS (e.g., `btn-success`, `p-3`, `form-control`).
- Valores exactos de atributos que constituyen la solución (e.g., `min="1900"`, `max="2025"`).
- Fragmentos de código, firmas o llamadas a librerías.
- Instrucciones paso a paso de "cómo implementar".

### Scoring y estructura

- Mantener títulos concisos y orientados al estudiante.
- Preferir múltiples checks pequeños sobre uno grande.
- Usar convenciones de scoring consistentes entre ejercicios.

---

## Gobernanza

Esta constitución es vinculante para todos los ejercicios y check files del repositorio.

Las enmiendas **deben** preservar: requisitos derivados del README, el layout de ejercicios y la política de no introducir archivos adicionales de requisitos docentes.

Versionado: versionado semántico para revisiones de la constitución.
