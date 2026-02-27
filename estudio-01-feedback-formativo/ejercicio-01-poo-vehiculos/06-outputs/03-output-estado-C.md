# Evaluación Docente — Tercera Revisión (Re-entrega) — Vehiculos.EstadoC

---

## 1. Resumen

La entrega cumple **todos los requisitos de la consigna** de forma correcta y limpia. El estudiante resolvió la totalidad de los problemas conceptuales que se habían señalado en revisiones anteriores. La clase `Vehiculo` es ahora `abstract` con un método `abstract void Encender()` — sin comportamiento, tal como pide el enunciado. Tanto `Auto` como `Camioneta` heredan correctamente, delegan al constructor base, y usan `override` con firma idéntica. Los mensajes coinciden textualmente con la especificación. El `Program.cs` utiliza `List<Vehiculo>` con un recorrido puramente polimórfico, sin rastro de `is`, `as`, ni lógica por tipo. Además, la estructura de la solución incluye **dos proyectos separados** (`Vehiculos.EstadoC` como consola y `Dominio` como class library) con la referencia entre proyectos correctamente configurada. **No se detectan errores críticos ni bloqueantes.**

**Aciertos nuevos concretos:**

1. `Vehiculo` es ahora una clase `abstract` con `Encender()` declarado como `abstract` — esto garantiza a nivel de compilador que toda subclase implemente el método, y cumple la consigna de "sin comportamiento".
2. La solución está correctamente separada en dos proyectos (`Dominio` como class library + `Vehiculos.EstadoC` como consola) con `<ProjectReference>` configurada en el `.csproj`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

**No se detectan errores críticos.** La solución cumple todos los requisitos de la consigna en sus aspectos conceptuales y estructurales.

---

### MEJORAS (no bloqueantes)

Estas observaciones son **opcionales** y no afectan la corrección ni el cumplimiento de la consigna. Se ofrecen como oportunidades de profundización.

---

#### M1 — Considerar constructor `protected` en la clase abstracta

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — constructor `public Vehiculo(...)` |
| **Síntoma** | El constructor es `public`, aunque la clase es `abstract` (no se puede instanciar directamente). |
| **Concepto** | **Modificadores de acceso en clases abstractas.** |
| **Explicación docente** | Como `Vehiculo` es `abstract`, nadie puede hacer `new Vehiculo(...)`. El constructor solo se invoca desde las subclases vía `: base(...)`. Marcarlo como `protected` comunica explícitamente esa intención: "este constructor existe solo para que las hijas lo usen". No cambia el comportamiento, pero mejora la legibilidad y la semántica del diseño. |
| **Pista** | ¿Qué modificador de acceso refleja mejor que un constructor solo puede ser llamado por las clases derivadas? |
| **Pregunta de chequeo** | Si alguien lee tu código y ve un constructor `public` en una clase `abstract`, ¿podría confundirse pensando que se puede instanciar? |

---

#### M2 — Agregar validaciones defensivas en el constructor

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — cuerpo del constructor |
| **Síntoma** | Se aceptan valores como `cantidadPuertas = -3` o `colorChasis = null` sin validación. |
| **Concepto** | **Programación defensiva / invariantes de clase.** |
| **Explicación docente** | Esto no es un error para esta consigna, pero en un diseño robusto conviene garantizar que los objetos siempre se creen en un estado válido. Por ejemplo: ¿tiene sentido un vehículo con puertas negativas? ¿O con color `null`? Son preguntas de diseño que vale la pena plantearse. |
| **Pista** | Investigá `ArgumentOutOfRangeException` y `ArgumentNullException` como mecanismos para rechazar valores inválidos al momento de la construcción. |
| **Pregunta de chequeo** | ¿Qué pasaría si alguien crea `new Auto(-5, null)`? ¿Tu objeto estaría en un estado coherente? |

---

## 3. Problemas previamente resueltos

La entrega resuelve **correctamente** todos los conceptos que típicamente fallan en este ejercicio:

| # | Concepto | Estado |
|---|---|---|
| 1 | `Encender()` en la clase base es `abstract` → sin comportamiento | Correcto |
| 2 | `Vehiculo` está marcada como `abstract` → no se puede instanciar directamente | Correcto |
| 3 | `Auto` y `Camioneta` usan `override` (no `new`, no sobrecarga) | Correcto |
| 4 | La firma de `Encender()` es idéntica en base e hijas (sin parámetros extra) | Correcto |
| 5 | No hay sobrecargas residuales innecesarias | Correcto |
| 6 | Los constructores de las hijas delegan al constructor base con `: base(...)` | Correcto |
| 7 | Los mensajes coinciden textualmente con la consigna | Correcto |
| 8 | `Camioneta` imprime "camioneta" (no "vehículo") | Correcto |
| 9 | `Program.cs` usa `List<Vehiculo>` (tipado por la abstracción) | Correcto |
| 10 | Un solo `foreach` con `v.Encender()` — recorrido polimórfico puro | Correcto |
| 11 | No hay `is`, `as`, `typeof` ni `GetType` — sin lógica por tipo | Correcto |
| 12 | Existen dos proyectos separados (consola + class library) | Correcto |
| 13 | `<ProjectReference>` configurada desde consola hacia `Dominio` | Correcto |
| 14 | Propiedades en `PascalCase` (`CantidadPuertas`, `ColorChasis`) | Correcto |
| 15 | Setters con visibilidad restringida (`private set`) | Correcto |
| 16 | No hay `using` redundantes ni errores sintácticos | Correcto |
| 17 | `Program.cs` es conciso, sin código muerto ni bloques redundantes | Correcto |

---

## 4. Preguntas guía para el estudiante

Estas preguntas no señalan errores: son disparadores para profundizar conceptos a partir de una solución que ya funciona correctamente.

1. ¿Por qué elegiste `abstract` en vez de `virtual` con cuerpo vacío para `Encender()` en `Vehiculo`? ¿Qué ventaja concreta te da `abstract` frente a `virtual` si una subclase se olvida de implementar el método?

2. Si mañana necesitás agregar `Moto : Vehiculo`, ¿cuántos archivos tenés que tocar? ¿El compilador te obliga a implementar algo? ¿Qué principio de diseño se manifiesta?

3. ¿Qué pasaría si intentaras escribir `new Vehiculo(4, "Rojo")` directamente en `Program.cs`? ¿Por qué el compilador lo rechaza?

4. Tu lista está tipada como `List<Vehiculo>`, pero contiene objetos `Auto` y `Camioneta`. ¿Cómo sabe el CLR (runtime) cuál versión de `Encender()` ejecutar para cada elemento? ¿Cómo se llama ese mecanismo?

5. Si necesitaras que `Vehiculo` tuviera un método `Apagar()` con un comportamiento por defecto (igual para todos), pero que algunas hijas pudieran personalizar, ¿usarías `abstract` o `virtual`? ¿Por qué?

6. ¿Qué ventaja tiene que `Dominio` sea un proyecto separado (class library) en vez de una carpeta dentro del proyecto de consola? ¿En qué escenarios concretos aprovecharías esa separación?

7. ¿Qué significa que los setters de las propiedades sean `private set`? ¿Quién puede modificar esos valores y cuándo? ¿Conocés la alternativa `init`? ¿En qué se diferencia?

---

## 5. Plan de próximos pasos (verificables)

Dado que la solución está completa y correcta, los siguientes pasos apuntan a **profundizar y extender** los conceptos aprendidos.

1. **(Opcional)** Cambiar el constructor de `Vehiculo` de `public` a `protected` y verificar que todo sigue compilando. Reflexionar sobre por qué tiene sentido en una clase abstracta.
2. Agregar una nueva clase `Moto : Vehiculo` al proyecto `Dominio`. Verificar que el compilador obliga a implementar `Encender()`. Agregarla a la lista en `Program.cs` sin modificar el `foreach`.
3. Intentar escribir `new Vehiculo(4, "Rojo")` en `Program.cs` y observar el error de compilación. Anotar el mensaje de error y explicar por qué ocurre.
4. Agregar un método `virtual void Apagar()` en `Vehiculo` con un comportamiento por defecto (ej. imprimir "Apagando vehículo"). Sobrescribirlo solo en `Auto`. Verificar que `Camioneta` usa la versión base y `Auto` usa la propia.
5. Agregar validaciones en el constructor de `Vehiculo` (ej. `cantidadPuertas > 0`, `colorChasis` no nulo). Verificar que `new Auto(-1, null)` arroje una excepción.
6. Crear un tercer proyecto de tipo **xUnit** o **NUnit** en la solución. Escribir un test que cree un `Auto`, llame a `Encender()`, y verifique (capturando `Console.Out`) que el mensaje es el esperado.
7. Investigar la diferencia entre `private set` e `init` en C#. Evaluar si `init` sería más apropiado para propiedades que solo se asignan en la construcción.
8. Investigar el concepto de **clases selladas** (`sealed`). ¿Tiene sentido marcar `Auto` y `Camioneta` como `sealed` si no se espera que tengan subclases?
9. Reflexionar: si la consigna pidiera que `Vehiculo` también pudiera existir como objeto concreto (no solo Auto/Camioneta), ¿podrías seguir usando `abstract`? ¿Qué alternativa usarías?
10. Leer sobre el **principio Open-Closed** (OCP) de SOLID. Identificar en tu solución dónde se cumple: ¿podés agregar nuevos tipos de vehículo sin modificar `Program.cs`?

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + class library) | BLOQUEANTE | OK |
| 2 | La referencia entre proyectos (`<ProjectReference>`) está configurada | BLOQUEANTE | OK |
| 3 | La clase base tiene las propiedades requeridas con tipos correctos | BLOQUEANTE | OK |
| 4 | `Encender()` en la clase base **no tiene comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE | OK |
| 5 | `Encender()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE | OK |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Vehiculo`) | BLOQUEANTE | OK |
| 7 | Los constructores de las hijas delegan al constructor base (`: base(...)`) | BLOQUEANTE | OK |
| 8 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `Encender()` | BLOQUEANTE | OK |
| 9 | La firma de `Encender()` es idéntica en base e hijas (mismo nombre, mismos parámetros) | BLOQUEANTE | OK |
| 10 | Los mensajes impresos coinciden **textualmente** con la especificación de la consigna | BLOQUEANTE | OK |
| 11 | Se usa `List<Vehiculo>` (no listas de tipos concretos) | BLOQUEANTE | OK |
| 12 | El recorrido es polimórfico: se llama a `Encender()` sin preguntar el tipo | BLOQUEANTE | OK |
| 13 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE | OK |
| 14 | No hay métodos sobrantes/residuales no requeridos por la consigna | NO BLOQUEANTE | OK |
| 15 | Las propiedades siguen la convención `PascalCase` de C# | NO BLOQUEANTE | OK |
| 16 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE | OK |
| 17 | No hay errores de sintaxis innecesarios (doble `;`, `using` sobrantes, etc.) | NO BLOQUEANTE | OK |
| 18 | Los `using` / `namespace` son correctos y coherentes con la estructura | NO BLOQUEANTE | OK |
| 19 | El código compila sin warnings | NO BLOQUEANTE | OK |
| 20 | `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE | OK |

---

**Valoración global: APROBADO — Todos los criterios cumplidos.**

La solución demuestra comprensión sólida de herencia, abstracción, polimorfismo por override, tipado de colecciones por la abstracción, y separación en proyectos. El código es limpio, conciso y cumple la consigna en todos sus puntos. Las únicas observaciones son mejoras opcionales de diseño avanzado (constructor `protected`, validaciones defensivas) que exceden el alcance de este ejercicio pero sirven como guía para seguir creciendo.
