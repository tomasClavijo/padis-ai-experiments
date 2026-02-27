# Evaluación Docente — Segunda Revisión (Re-entrega) — Vehiculos.EstadoB

---

## 1. Resumen

La re-entrega muestra un **avance significativo** respecto de la versión anterior. El estudiante comprendió y aplicó correctamente el mecanismo central de **sobrescritura con `virtual`/`override`**, que era el déficit más grave de la primera entrega. Ahora el polimorfismo **funciona en tiempo de ejecución**: el primer `foreach` sobre `List<Vehiculo>` despacha dinámicamente a las implementaciones de `Auto` y `Camioneta`. También se corrigieron las convenciones de nombres (`PascalCase`), la encapsulación de propiedades (`private set`) y el mensaje de `Camioneta` (que antes decía "vehículo"). Sin embargo, persisten tres problemas de consigna: el método `Encender()` en la clase base **sigue teniendo comportamiento**, el segundo `foreach` en `Program.cs` **todavía usa `is`**, y **no existe un proyecto de class library separado** para `Dominio`. Además, los mensajes impresos no coinciden textualmente con el formato que pide la consigna.

**Aciertos nuevos concretos:**

1. `Encender()` en `Vehiculo` ahora es `virtual`, y tanto `Auto` como `Camioneta` lo redefinen correctamente con `override` y firma idéntica — el polimorfismo es real.
2. Las propiedades usan `PascalCase` (`CantidadPuertas`, `ColorChasis`) con `private set`, mejorando tanto la convención como la encapsulación.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — `Vehiculo.Encender()` sigue teniendo comportamiento

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — método `Encender()` (líneas 16-19) |
| **Síntoma** | El método imprime `"Encendiendo vehículo con..."`. La consigna dice explícitamente: *"un método Encender() sin comportamiento"*. |
| **Concepto** | **Diseño de clases base / abstracción** — "sin comportamiento" implica cuerpo vacío (`{ }`) o, mejor aún, un método `abstract`. |
| **Explicación docente** | Si la base tiene un mensaje propio, cualquier subclase que olvide el `override` mostrará un texto genérico en vez de fallar o quedarse silenciosa. Peor: con `virtual`, el compilador no obliga a redefinir. Solo `abstract` garantiza que cada hija provea su implementación. Además, el enunciado es claro: el método base no debe hacer nada. |
| **Pista** | Eliminá el contenido del cuerpo (dejalo vacío) o investigá qué pasa si usás `abstract` en vez de `virtual`. Si elegís `abstract`, ¿qué le pasa a la clase que lo contiene? |
| **Pregunta de chequeo** | Si mañana agregás `Moto : Vehiculo` y te olvidás de redefinir `Encender()`, ¿qué se imprime? ¿Preferirías que el compilador te avise? |

---

#### C2 — El segundo `foreach` sigue usando `is` (lógica por tipo)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — segundo `foreach` (líneas 16-27) |
| **Síntoma** | Se pregunta `if (v is Auto)` y `else if (v is Camioneta)` antes de actuar. |
| **Concepto** | **Polimorfismo / Principio Open-Closed** — la consigna dice: *"ausencia de lógica por tipo (evitar `is`/`as`)"*. |
| **Explicación docente** | Es cierto que dentro de cada rama se llama a `v.Encender()` (lo cual ahora sí funciona polimórficamente), pero el bloque entero es redundante y contradice la consigna. El primer `foreach` ya demuestra el recorrido polimórfico correcto. Si el segundo bloque existe solo para agregar un `Console.WriteLine("Es un auto!")`, eso mismo es lógica por tipo: estás tomando decisiones según la clase concreta. |
| **Pista** | Mirá el primer `foreach`: ya hace exactamente lo que la consigna pide. ¿El segundo bloque agrega algo que no se pueda lograr sin `is`? Si lo eliminás, ¿perdés funcionalidad requerida por la consigna? |
| **Pregunta de chequeo** | Si agregás `Moto`, ¿cuántos `if` nuevos necesitás en el segundo bloque? ¿Y en el primero? |

---

#### C3 — No existe un proyecto separado de tipo Class Library para `Dominio`

| Aspecto | Detalle |
|---|---|
| **Dónde** | Estructura de la solución — archivo `.sln` y único `.csproj` |
| **Síntoma** | La solución contiene un solo proyecto (`Vehiculos.EstadoB`). `Dominio` es una carpeta dentro del proyecto de consola, no un proyecto independiente de tipo library. |
| **Concepto** | **Separación en capas / organización de proyectos.** |
| **Explicación docente** | La consigna dice: *"Crear un proyecto de librería de clases de nombre Dominio"*. Eso implica un `.csproj` propio (sin `<OutputType>Exe</OutputType>`, o con `<OutputType>Library</OutputType>`), y una referencia `<ProjectReference>` desde el proyecto de consola. Tener las clases en una carpeta es una organización interna, no una separación en proyectos. |
| **Pista** | Revisá cuántos archivos `.csproj` tenés. ¿Podés crear un nuevo proyecto de tipo "Class Library" en la solución y mover allí las clases de dominio? Luego agregá la referencia entre proyectos. |
| **Pregunta de chequeo** | Si otro equipo quisiera usar tus clases `Vehiculo`, `Auto` y `Camioneta` sin el `Program.cs`, ¿podría referenciar solo la librería? |

---

#### C4 — Los mensajes impresos no coinciden con el formato de la consigna

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Auto.cs` (línea 12), `Dominio/Camioneta.cs` (línea 12) |
| **Síntoma** | El código imprime `"Encendiendo auto con 4 puertas y chasis Rojo"`. La consigna pide `"Encendiendo auto con cantidad de puertas 4 y color de chasis Rojo"`. |
| **Concepto** | **Cumplimiento de la especificación funcional.** |
| **Explicación docente** | La consigna especifica un formato textual concreto: *"con cantidad de puertas x y color de chasis y"*. El código actual abrevia la redacción (*"con 4 puertas y chasis Rojo"*). En un entorno profesional, la diferencia podría hacer fallar tests automatizados que comparan strings exactos. |
| **Pista** | Compará carácter a carácter el texto dentro de tu `Console.WriteLine` con el texto de la consigna. ¿Dicen exactamente lo mismo? |
| **Pregunta de chequeo** | Si hubiera un test que verifica la salida con `Assert.AreEqual("Encendiendo auto con cantidad de puertas 4 y color de chasis Rojo", resultado)`, ¿pasaría? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Sobrecarga residual `Encender(string extra)` en `Auto`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Auto.cs` — líneas 15-18 |
| **Síntoma** | Existe un método `Encender(string extra)` que no está requerido por la consigna. |
| **Concepto** | **Sobrecarga (overload) vs. código muerto.** |
| **Por qué importa** | No rompe nada (la firma es distinta, no interfiere con el `override`), pero agrega un método que nadie usa y que no fue solicitado. En una entrega, esto puede generar confusión sobre si el estudiante distingue overload de override, o si es un vestigio de la versión anterior. |
| **Pista** | ¿Algún lugar de tu código llama a `Encender("algo")`? Si no, ¿por qué mantenerlo? |

---

#### M2 — El `using System;` en `Vehiculo.cs` es redundante

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — línea 1 |
| **Síntoma** | Con `<ImplicitUsings>enable</ImplicitUsings>` en el `.csproj`, el namespace `System` ya se importa automáticamente. |
| **Por qué importa** | No causa error, pero es código innecesario. Es buena práctica mantener solo los `using` que se necesitan. |

---

#### M3 — Considerar `abstract` en lugar de `virtual` para `Encender()`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — método `Encender()` |
| **Síntoma** | Con `virtual`, una subclase puede "olvidarse" de redefinir `Encender()` y el código compila igual. |
| **Concepto** | **Clases y métodos abstractos** — fuerzan a las hijas a implementar. |
| **Por qué importa** | Si la consigna dice "sin comportamiento" y querés garantizar que toda subclase provea su propia versión, `abstract` es la herramienta idiomática. No es estrictamente un error usar `virtual` con cuerpo vacío, pero `abstract` comunica mejor la intención. |

---

## 3. Problemas previamente resueltos

La re-entrega resuelve **correctamente** los siguientes conceptos que fallaban en la versión anterior:

| # | Problema anterior | Estado actual |
|---|---|---|
| 1 | `Encender()` en `Vehiculo` no era `virtual` → sin despacho dinámico | Ahora es `virtual`. El polimorfismo funciona. |
| 2 | `Auto.Encender(string extra)` era sobrecarga, no override → firma distinta | Ahora existe `override void Encender()` con firma correcta. |
| 3 | `Camioneta` usaba `new` → ocultamiento en vez de sobrescritura | Ahora usa `override`. |
| 4 | `Camioneta.Encender()` imprimía "vehículo" en vez de "camioneta" | Ahora imprime "camioneta". |
| 5 | Propiedades en `camelCase` (`cantidadPuertas`) | Ahora en `PascalCase` (`CantidadPuertas`). |
| 6 | Setters públicos sin restricción | Ahora usan `private set`. |
| 7 | Doble punto y coma en `using` de `Program.cs` | Corregido. |

**Esto es un progreso muy significativo.** Los tres pilares del ejercicio — herencia, `virtual`/`override`, y recorrido polimórfico — ahora están implementados correctamente en su mecánica central.

---

## 4. Preguntas guía para el estudiante

1. Si `Encender()` en la clase base tiene un `Console.WriteLine(...)`, ¿se cumple literalmente la consigna que dice "sin comportamiento"? ¿Qué tendrías que hacer para cumplirla?

2. ¿Cuál es la diferencia entre `virtual` (con cuerpo vacío) y `abstract`? ¿Cuál de los dos obliga al compilador a rechazar una subclase que no implemente `Encender()`?

3. Si el primer `foreach` ya llama a `v.Encender()` polimórficamente y funciona, ¿qué aporta el segundo `foreach` que usa `is`? ¿Podrías eliminarlo sin perder lo que la consigna pide?

4. ¿Qué diferencia hay entre una carpeta `Dominio` dentro de un proyecto y un **proyecto** `Dominio` dentro de la solución? ¿Qué ventaja da tener un `.csproj` separado?

5. El método `Encender(string extra)` en `Auto`: ¿lo usa algún código de tu programa? ¿Sobra o lo dejaste intencionalmente?

6. Compará el texto exacto de tu `Console.WriteLine` con el de la consigna: ¿coinciden palabra por palabra?

7. Si mañana tenés que agregar `Moto : Vehiculo`, ¿cuántos archivos tenés que tocar? ¿Tu diseño actual lo facilita o lo complica?

8. ¿Por qué es importante que la firma de un método `override` sea **idéntica** a la del método `virtual` en la base? ¿Qué pasaría si difiriera en un parámetro?

---

## 5. Plan de próximos pasos (verificables)

1. **Vaciar el cuerpo de `Encender()` en `Vehiculo`** — eliminar el `Console.WriteLine` para cumplir "sin comportamiento" (o considerar marcarlo `abstract`; en ese caso, también marcar la clase como `abstract`).
2. **Corregir el texto de los mensajes** en `Auto.Encender()` y `Camioneta.Encender()` para que coincida exactamente con el formato de la consigna: `"Encendiendo auto con cantidad de puertas {CantidadPuertas} y color de chasis {ColorChasis}"`.
3. **Eliminar el segundo `foreach`** en `Program.cs` (líneas 14-27) que usa `is`, ya que no es necesario y viola la restricción de la consigna.
4. **Eliminar la sobrecarga `Encender(string extra)`** en `Auto.cs`, que no es requerida y puede confundir.
5. **Crear un proyecto de tipo Class Library** llamado `Dominio` dentro de la solución.
6. **Mover las clases** `Vehiculo.cs`, `Auto.cs` y `Camioneta.cs` al nuevo proyecto `Dominio`.
7. **Agregar una `<ProjectReference>`** desde `Vehiculos.EstadoB` hacia `Dominio`.
8. **Actualizar los `namespace`** de las clases movidas para que reflejen el nuevo proyecto (ej. `Dominio`).
9. **Actualizar el `using`** en `Program.cs` para que apunte al namespace del proyecto `Dominio`.
10. **Eliminar el `using System;`** innecesario en `Vehiculo.cs`.
11. **Compilar** y verificar que no hay errores ni warnings.
12. **Ejecutar** y verificar que la salida muestra los mensajes diferenciados para cada vehículo, con el texto exacto de la consigna, sin lógica condicional por tipo.
13. **(Opcional)** Si se eligió `abstract` para `Encender()`, verificar que `new Vehiculo(...)` no compila directamente — eso confirma que `abstract` funciona como se espera.

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + library) | BLOQUEANTE | Pendiente |
| 2 | La referencia entre proyectos está configurada correctamente | BLOQUEANTE | Pendiente |
| 3 | La clase base tiene las propiedades requeridas con tipos correctos | BLOQUEANTE | OK |
| 4 | `Encender()` en la clase base **no tiene comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE | Pendiente |
| 5 | `Encender()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE | OK |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Vehiculo`) | BLOQUEANTE | OK |
| 7 | Los constructores de las hijas delegan al constructor base (`: base(...)`) | BLOQUEANTE | OK |
| 8 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `Encender()` | BLOQUEANTE | OK |
| 9 | La firma de `Encender()` es idéntica en base e hijas | BLOQUEANTE | OK |
| 10 | Los mensajes impresos coinciden **textualmente** con la especificación de la consigna | BLOQUEANTE | Pendiente |
| 11 | Se usa `List<Vehiculo>` (no listas de tipos concretos) | BLOQUEANTE | OK |
| 12 | El recorrido es polimórfico: se llama a `Encender()` sin preguntar el tipo | BLOQUEANTE | OK (primer foreach) |
| 13 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE | Pendiente |
| 14 | No hay métodos sobrantes no requeridos por la consigna | NO BLOQUEANTE | Pendiente |
| 15 | Las propiedades siguen la convención `PascalCase` | NO BLOQUEANTE | OK |
| 16 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE | OK |
| 17 | No hay errores de sintaxis innecesarios (doble `;`, `using` sobrantes) | NO BLOQUEANTE | Casi OK |
| 18 | Los `using` / `namespace` son correctos y coherentes | NO BLOQUEANTE | OK |
| 19 | El código compila sin warnings | NO BLOQUEANTE | Verificar |
| 20 | `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE | Pendiente |

---

**Valoración global:** El estudiante resolvió los problemas conceptuales más importantes (`virtual`/`override`, firma correcta, polimorfismo funcional, convenciones). El núcleo del ejercicio — herencia con despacho dinámico — **ahora funciona**. Los puntos pendientes son de cumplimiento de consigna (texto exacto de mensajes, separación en proyectos, eliminar `is` y el método base con comportamiento) y de limpieza (código sobrante). El progreso es claro y demuestra que el estudiante incorporó los conceptos señalados en la primera revisión.
