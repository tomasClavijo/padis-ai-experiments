# Evaluación Docente — Segunda Revisión (Re-entrega) — Figuras.EstadoB

---

## 1. Resumen

La re-entrega muestra un **avance significativo** respecto de la versión anterior. El estudiante comprendió y aplicó correctamente el mecanismo central de **sobrescritura con `virtual`/`override`**, que era el déficit más grave de la primera entrega. Ahora el polimorfismo **funciona en tiempo de ejecución**: el primer `foreach` sobre `List<Figura>` despacha dinámicamente a las implementaciones de `TrianguloEquilatero`, `Rectangulo` y `Circulo`. También se corrigieron las convenciones de nombres (`PascalCase`), la encapsulación de propiedades (`private set`), la fórmula del perímetro de `Rectangulo`, y se agregó validación de dimensiones en `TrianguloEquilatero` y `Circulo`. Sin embargo, persisten problemas: el método `MostrarInfo()` en la clase base **sigue teniendo comportamiento**, el segundo `foreach` en `Program.cs` **todavía usa `is`**, **no existe un proyecto de class library separado** para `Dominio`, la validación en `Rectangulo` está ausente, y los mensajes incluyen formato `:F2` que la consigna no especifica.

**Aciertos nuevos concretos:**

1. `MostrarInfo()` en `Figura` ahora es `virtual`, y `TrianguloEquilatero`, `Rectangulo` y `Circulo` lo redefinen correctamente con `override` y firma idéntica — el polimorfismo es real.
2. Las propiedades usan `PascalCase` (`Lado`, `Base`, `Altura`, `Radio`) con `private set`, mejorando tanto la convención como la encapsulación.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — `Figura.MostrarInfo()` sigue teniendo comportamiento

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — método `MostrarInfo()` |
| **Síntoma** | El método imprime `"Mostrando información de la figura"`. La consigna dice explícitamente: *"un método MostrarInfo() sin comportamiento"*. |
| **Concepto** | **Diseño de clases base / abstracción** — "sin comportamiento" implica cuerpo vacío (`{ }`) o, mejor aún, un método `abstract`. |
| **Explicación docente** | Si la base tiene un mensaje propio, cualquier subclase que olvide el `override` mostrará un texto genérico en vez de fallar o quedarse silenciosa. Peor: con `virtual`, el compilador no obliga a redefinir. Solo `abstract` garantiza que cada hija provea su implementación. Además, el enunciado es claro: el método base no debe hacer nada. |
| **Pista** | Eliminá el contenido del cuerpo (dejalo vacío) o investigá qué pasa si usás `abstract` en vez de `virtual`. Si elegís `abstract`, ¿qué le pasa a la clase que lo contiene? |
| **Pregunta de chequeo** | Si mañana agregás `Pentagono : Figura` y te olvidás de redefinir `MostrarInfo()`, ¿qué se imprime? ¿Preferirías que el compilador te avise? |

---

#### C2 — El segundo `foreach` sigue usando `is` (lógica por tipo)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — segundo `foreach` |
| **Síntoma** | Se pregunta `if (f is TrianguloEquilatero)`, `else if (f is Rectangulo)`, `else if (f is Circulo)` antes de actuar. |
| **Concepto** | **Polimorfismo / Principio Open-Closed** — la consigna dice: *"ausencia de lógica por tipo (evitar `is`/`as`)"*. |
| **Explicación docente** | Es cierto que dentro de cada rama se llama a `f.MostrarInfo()` (lo cual ahora sí funciona polimórficamente), pero el bloque entero es redundante y contradice la consigna. El primer `foreach` ya demuestra el recorrido polimórfico correcto. Si el segundo bloque existe solo para agregar un `Console.WriteLine("Es un triángulo!")`, eso mismo es lógica por tipo: estás tomando decisiones según la clase concreta. |
| **Pista** | Mirá el primer `foreach`: ya hace exactamente lo que la consigna pide. ¿El segundo bloque agrega algo que no se pueda lograr sin `is`? Si lo eliminás, ¿perdés funcionalidad requerida por la consigna? |
| **Pregunta de chequeo** | Si agregás `Pentagono`, ¿cuántos `if` nuevos necesitás en el segundo bloque? ¿Y en el primero? |

---

#### C3 — No existe un proyecto separado de tipo Class Library para `Dominio`

| Aspecto | Detalle |
|---|---|
| **Dónde** | Estructura de la solución — archivo `.sln` y único `.csproj` |
| **Síntoma** | La solución contiene un solo proyecto (`Figuras.EstadoB`). `Dominio` es una carpeta dentro del proyecto de consola, no un proyecto independiente de tipo library. |
| **Concepto** | **Separación en capas / organización de proyectos.** |
| **Explicación docente** | La consigna dice: *"Crear un proyecto de librería de clases de nombre Dominio"*. Eso implica un `.csproj` propio (sin `<OutputType>Exe</OutputType>`), y una referencia `<ProjectReference>` desde el proyecto de consola. Tener las clases en una carpeta es una organización interna, no una separación en proyectos. |
| **Pista** | Revisá cuántos archivos `.csproj` tenés. ¿Podés crear un nuevo proyecto de tipo "Class Library" en la solución y mover allí las clases de dominio? Luego agregá la referencia entre proyectos. |
| **Pregunta de chequeo** | Si otro equipo quisiera usar tus clases `Figura`, `TrianguloEquilatero`, etc. sin el `Program.cs`, ¿podría referenciar solo la librería? |

---

#### C4 — Validación de dimensiones inconsistente: ausente en `Rectangulo`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Rectangulo.cs` — constructor |
| **Síntoma** | `TrianguloEquilatero` y `Circulo` validan que sus dimensiones sean mayores a 0, pero `Rectangulo` acepta cualquier valor (incluyendo 0 y negativos). |
| **Concepto** | **Programación defensiva / invariantes de clase.** |
| **Explicación docente** | La consigna dice *"Validar en el constructor que las dimensiones sean mayores a 0"* — esto aplica a **todas** las figuras. Un rectángulo con base 0 o altura negativa no tiene sentido geométrico. La validación parcial evidencia que el concepto se entiende, pero falta aplicarlo uniformemente. |
| **Pista** | Revisá los constructores de las tres figuras. ¿Todas validan de la misma manera? ¿Qué pasa si creás `new Rectangulo(-1, 0)`? |
| **Pregunta de chequeo** | ¿Un rectángulo con base negativa tiene área y perímetro con sentido? ¿Qué debería pasar al intentar crearlo? |

---

#### C5 — Los mensajes impresos no coinciden con el formato de la consigna

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/TrianguloEquilatero.cs`, `Dominio/Rectangulo.cs`, `Dominio/Circulo.cs` — `Console.WriteLine` |
| **Síntoma** | El código usa formato `:F2` (ej. `{Lado:F2}`, `{area:F2}`) que la consigna no especifica. Los mensajes de la consigna usan `{Lado}`, `{área}`, `{perímetro}` sin formato adicional. |
| **Concepto** | **Cumplimiento de la especificación funcional.** |
| **Explicación docente** | La consigna especifica un formato textual concreto. El código agrega formato numérico con dos decimales que no fue solicitado. En un entorno profesional, la diferencia podría hacer fallar tests automatizados que comparan strings exactos. |
| **Pista** | Compará carácter a carácter el texto dentro de tu `Console.WriteLine` con el texto de la consigna. ¿Dicen exactamente lo mismo? |
| **Pregunta de chequeo** | Si hubiera un test que verifica la salida con un `Assert.AreEqual(...)` del texto exacto, ¿pasaría? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Sobrecarga residual `MostrarInfo(string formato)` en `Circulo`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Circulo.cs` |
| **Síntoma** | Existe un método `MostrarInfo(string formato)` que no está requerido por la consigna. |
| **Concepto** | **Sobrecarga (overload) vs. código muerto.** |
| **Por qué importa** | No rompe nada (la firma es distinta, no interfiere con el `override`), pero agrega un método que nadie usa y que no fue solicitado. En una entrega, esto puede generar confusión sobre si el estudiante distingue overload de override, o si es un vestigio de la versión anterior. |
| **Pista** | ¿Algún lugar de tu código llama a `MostrarInfo("algo")`? Si no, ¿por qué mantenerlo? |

---

#### M2 — El `using System;` en `Figura.cs` es redundante

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — línea 1 |
| **Síntoma** | Con `<ImplicitUsings>enable</ImplicitUsings>` en el `.csproj`, el namespace `System` ya se importa automáticamente. |
| **Por qué importa** | No causa error, pero es código innecesario. Es buena práctica mantener solo los `using` que se necesitan. |

---

#### M3 — Considerar `abstract` en lugar de `virtual` para `MostrarInfo()`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — método `MostrarInfo()` |
| **Síntoma** | Con `virtual`, una subclase puede "olvidarse" de redefinir `MostrarInfo()` y el código compila igual. |
| **Concepto** | **Clases y métodos abstractos** — fuerzan a las hijas a implementar. |
| **Por qué importa** | Si la consigna dice "sin comportamiento" y querés garantizar que toda subclase provea su propia versión, `abstract` es la herramienta idiomática. No es estrictamente un error usar `virtual` con cuerpo vacío, pero `abstract` comunica mejor la intención. |

---

## 3. Problemas previamente resueltos

La re-entrega resuelve **correctamente** los siguientes conceptos que fallaban en la versión anterior:

| # | Problema anterior | Estado actual |
|---|---|---|
| 1 | `MostrarInfo()` en `Figura` no era `virtual` → sin despacho dinámico | Ahora es `virtual`. El polimorfismo funciona. |
| 2 | `TrianguloEquilatero` y `Rectangulo` usaban `new` → ocultamiento en vez de sobrescritura | Ahora usan `override`. |
| 3 | `Circulo.MostrarInfo(string formato)` era sobrecarga, no override → firma distinta | Ahora existe `override void MostrarInfo()` con firma correcta. |
| 4 | Fórmula del perímetro de `Rectangulo` era incorrecta (`base × altura`) | Ahora usa `2 × (base + altura)`. |
| 5 | Propiedades en `camelCase` (`lado`, `radio`, `baseRect`) | Ahora en `PascalCase` (`Lado`, `Radio`, `Base`). |
| 6 | Setters públicos sin restricción | Ahora usan `private set`. |
| 7 | Doble punto y coma en `using` de `Program.cs` | Corregido. |
| 8 | Ningún constructor validaba dimensiones | Ahora `TrianguloEquilatero` y `Circulo` validan (falta `Rectangulo`). |

**Esto es un progreso muy significativo.** Los pilares del ejercicio — herencia, `virtual`/`override`, y recorrido polimórfico — ahora están implementados correctamente en su mecánica central.

---

## 4. Preguntas guía para el estudiante

1. Si `MostrarInfo()` en la clase base tiene un `Console.WriteLine(...)`, ¿se cumple literalmente la consigna que dice "sin comportamiento"? ¿Qué tendrías que hacer para cumplirla?

2. ¿Cuál es la diferencia entre `virtual` (con cuerpo vacío) y `abstract`? ¿Cuál de los dos obliga al compilador a rechazar una subclase que no implemente `MostrarInfo()`?

3. Si el primer `foreach` ya llama a `f.MostrarInfo()` polimórficamente y funciona, ¿qué aporta el segundo `foreach` que usa `is`? ¿Podrías eliminarlo sin perder lo que la consigna pide?

4. ¿Qué diferencia hay entre una carpeta `Dominio` dentro de un proyecto y un **proyecto** `Dominio` dentro de la solución? ¿Qué ventaja da tener un `.csproj` separado?

5. El método `MostrarInfo(string formato)` en `Circulo`: ¿lo usa algún código de tu programa? ¿Sobra o lo dejaste intencionalmente?

6. `TrianguloEquilatero` y `Circulo` validan sus dimensiones, pero `Rectangulo` no. ¿La consigna dice que la validación es solo para algunas figuras?

7. Compará el texto exacto de tu `Console.WriteLine` con el de la consigna: ¿coinciden palabra por palabra? ¿El formato `:F2` estaba solicitado?

8. Si mañana tenés que agregar `Pentagono : Figura`, ¿cuántos archivos tenés que tocar? ¿Tu diseño actual lo facilita o lo complica?

---

## 5. Plan de próximos pasos (verificables)

1. **Vaciar el cuerpo de `MostrarInfo()` en `Figura`** — eliminar el `Console.WriteLine` para cumplir "sin comportamiento" (o considerar marcarlo `abstract`; en ese caso, también marcar la clase como `abstract`).
2. **Agregar validación en el constructor de `Rectangulo`** — verificar que `base > 0` y `altura > 0`, lanzando `ArgumentException` igual que en las otras figuras.
3. **Corregir el formato de los mensajes** en `TrianguloEquilatero.MostrarInfo()`, `Rectangulo.MostrarInfo()` y `Circulo.MostrarInfo()` para que coincida exactamente con la consigna (sin `:F2`).
4. **Eliminar el segundo `foreach`** en `Program.cs` que usa `is`, ya que no es necesario y viola la restricción de la consigna.
5. **Eliminar la sobrecarga `MostrarInfo(string formato)`** en `Circulo.cs`, que no es requerida y puede confundir.
6. **Crear un proyecto de tipo Class Library** llamado `Dominio` dentro de la solución.
7. **Mover las clases** `Figura.cs`, `TrianguloEquilatero.cs`, `Rectangulo.cs` y `Circulo.cs` al nuevo proyecto `Dominio`.
8. **Agregar una `<ProjectReference>`** desde `Figuras.EstadoB` hacia `Dominio`.
9. **Actualizar los `namespace`** de las clases movidas para que reflejen el nuevo proyecto (ej. `Dominio`).
10. **Actualizar el `using`** en `Program.cs` para que apunte al namespace del proyecto `Dominio`.
11. **Eliminar el `using System;`** innecesario en `Figura.cs`.
12. **Compilar** y verificar que no hay errores ni warnings.
13. **Ejecutar** y verificar que la salida muestra los mensajes diferenciados para cada figura, con el texto exacto de la consigna, sin lógica condicional por tipo.
14. **(Opcional)** Si se eligió `abstract` para `MostrarInfo()`, verificar que `new Figura()` no compila directamente — eso confirma que `abstract` funciona como se espera.

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + library) | BLOQUEANTE | Pendiente |
| 2 | La referencia entre proyectos está configurada correctamente | BLOQUEANTE | Pendiente |
| 3 | La clase base tiene el método `MostrarInfo()` | BLOQUEANTE | OK |
| 4 | `MostrarInfo()` en la clase base **no tiene comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE | Pendiente |
| 5 | `MostrarInfo()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE | OK |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Figura`) | BLOQUEANTE | OK |
| 7 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `MostrarInfo()` | BLOQUEANTE | OK |
| 8 | La firma de `MostrarInfo()` es idéntica en base e hijas | BLOQUEANTE | OK |
| 9 | Los mensajes impresos coinciden **textualmente** con la especificación de la consigna | BLOQUEANTE | Pendiente |
| 10 | Las fórmulas de área y perímetro son correctas | BLOQUEANTE | OK |
| 11 | Se valida en constructores que las dimensiones sean mayores a 0 (todas las figuras) | BLOQUEANTE | Parcial |
| 12 | Se lanza `ArgumentException` ante dimensiones inválidas | BLOQUEANTE | Parcial |
| 13 | Se usa `List<Figura>` (no listas de tipos concretos) | BLOQUEANTE | OK |
| 14 | El recorrido es polimórfico: se llama a `MostrarInfo()` sin preguntar el tipo | BLOQUEANTE | OK (primer foreach) |
| 15 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE | Pendiente |
| 16 | No hay métodos sobrantes no requeridos por la consigna | NO BLOQUEANTE | Pendiente |
| 17 | Las propiedades siguen la convención `PascalCase` | NO BLOQUEANTE | OK |
| 18 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE | OK |
| 19 | No hay errores de sintaxis innecesarios (doble `;`, `using` sobrantes) | NO BLOQUEANTE | Casi OK |
| 20 | Los `using` / `namespace` son correctos y coherentes | NO BLOQUEANTE | OK |
| 21 | El código compila sin warnings | NO BLOQUEANTE | Verificar |
| 22 | `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE | Pendiente |

---

**Valoración global:** El estudiante resolvió los problemas conceptuales más importantes (`virtual`/`override`, firma correcta, polimorfismo funcional, convenciones, fórmula del perímetro). El núcleo del ejercicio — herencia con despacho dinámico — **ahora funciona**. Los puntos pendientes son de cumplimiento de consigna (formato exacto de mensajes, separación en proyectos, eliminar `is`, validación completa en todos los constructores y el método base con comportamiento) y de limpieza (código sobrante). El progreso es claro y demuestra que el estudiante incorporó los conceptos señalados en la primera revisión.
