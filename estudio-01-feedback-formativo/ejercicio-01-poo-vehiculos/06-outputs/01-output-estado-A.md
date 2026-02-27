# Evaluación Docente — Vehiculos.EstadoA

---

## 1. Resumen

La entrega demuestra que el estudiante comprende la idea general de herencia y la intención del polimorfismo: las clases `Auto` y `Camioneta` heredan de `Vehiculo`, los constructores delegan correctamente al constructor base, y se utiliza una `List<Vehiculo>` para almacenar objetos de distintos tipos. Sin embargo, el mecanismo de **sobrescritura (override)** está completamente ausente, lo que provoca que el polimorfismo **no funcione en tiempo de ejecución**. El método `Encender` en la clase base no es `virtual`, en `Auto` se declara como sobrecarga (distinta firma), y en `Camioneta` se usa `new` (ocultamiento). Además, la segunda iteración en `Program.cs` introduce lógica por tipo (`is`), algo que la consigna pide evitar explícitamente. Finalmente, no existe un proyecto de librería de clases separado llamado `Dominio`.

**Aciertos reales:**

1. Las clases `Auto` y `Camioneta` heredan de `Vehiculo` y delegan correctamente los parámetros al constructor base usando `: base(cantidadPuertas, colorChasis)`.
2. La colección en `Program.cs` está correctamente tipada como `List<Vehiculo>`, y el primer `foreach` intenta un recorrido polimórfico llamando a `v.Encender()`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — El método `Encender()` en `Vehiculo` no es `virtual`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — método `Encender()` |
| **Síntoma** | Al recorrer la `List<Vehiculo>` y llamar a `v.Encender()`, siempre se ejecuta la versión de `Vehiculo`, sin importar el tipo real del objeto. |
| **Concepto** | **Polimorfismo / despacho dinámico** — requiere que el método en la clase base sea `virtual` para que el CLR resuelva la llamada en tiempo de ejecución. |
| **Por qué está mal** | Sin la palabra clave `virtual`, C# no puede hacer *late binding*. Las subclases no tienen un mecanismo legítimo para *sobrescribir* el comportamiento; solo pueden *ocultarlo* o *sobrecargarlo*, ambos insuficientes para polimorfismo. |
| **Pista** | Revisá qué palabra clave necesita un método en la clase base para que sus clases hijas puedan redefinirlo con `override`. |
| **Pregunta de chequeo** | Si declarás una variable como `Vehiculo v = new Auto(...)` y llamás `v.Encender()`, ¿qué versión del método se ejecuta y por qué? |

---

#### C2 — `Vehiculo.Encender()` tiene comportamiento (la consigna pide que no lo tenga)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — cuerpo de `Encender()` |
| **Síntoma** | El método imprime `"Encendiendo vehículo con..."`, pero la consigna dice: *"un método Encender() sin comportamiento"*. |
| **Concepto** | **Diseño de clases base / abstracción** — un método "sin comportamiento" implica un cuerpo vacío o, mejor aún, un método abstracto. |
| **Por qué está mal** | Si la clase base ya resuelve la impresión, las hijas no necesitan redefinir nada, lo cual anula el propósito del ejercicio (practicar override). Además, si el polimorfismo no funciona, este es el mensaje que siempre se muestra. |
| **Pista** | Pensá en la diferencia entre un método con cuerpo vacío (`{ }`) y un método `abstract`. ¿Cuál de los dos obliga a las clases hijas a dar su propia implementación? |
| **Pregunta de chequeo** | ¿Qué pasa si una clase hija se "olvida" de redefinir `Encender()`? ¿Preferirías que compile o que el compilador te avise? |

---

#### C3 — `Auto.Encender(string extra)` es sobrecarga, no sobrescritura

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Auto.cs` — `public void Encender(string extra)` |
| **Síntoma** | El método en `Auto` recibe un parámetro `string extra` que la versión base no tiene. Esto crea un **método nuevo** con distinta firma, no una redefinición del existente. |
| **Concepto** | **Override vs. Overload** — sobrescribir exige la misma firma (nombre + parámetros); cambiar la firma es sobrecargar. |
| **Por qué está mal** | Cuando el `foreach` llama a `v.Encender()` (sin argumentos), nunca se invoca `Auto.Encender(string)`. El compilador resuelve la llamada al método de `Vehiculo`, porque `Auto` no tiene un `Encender()` sin parámetros que lo reemplace. |
| **Pista** | Compará la firma de `Encender` en `Vehiculo` con la de `Auto`. ¿Son iguales? ¿Qué palabra clave falta en `Auto` y qué sobra en su lista de parámetros? |
| **Pregunta de chequeo** | Si tenés `Vehiculo v = new Auto(4, "Rojo")`, ¿podés llamar a `v.Encender("extra")`? ¿Por qué sí o por qué no? |

---

#### C4 — `Camioneta.Encender()` usa `new` en vez de `override`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Camioneta.cs` — `public new void Encender()` |
| **Síntoma** | La palabra clave `new` oculta (*hides*) el método de la base en lugar de sobrescribirlo. |
| **Concepto** | **Method hiding vs. overriding** — `new` rompe el polimorfismo; el método que se ejecuta depende del tipo de la *variable*, no del tipo del *objeto*. |
| **Por qué está mal** | Al llamar `v.Encender()` donde `v` es de tipo `Vehiculo`, se ejecuta `Vehiculo.Encender()` aunque el objeto sea una `Camioneta`. Solo se ejecutaría la versión de `Camioneta` si la variable fuera de tipo `Camioneta`. |
| **Pista** | Reemplazá `new` por otra palabra clave que indique "estoy redefiniendo el comportamiento heredado". Pero ojo: para que eso compile, primero necesitás algo en la clase base. |
| **Pregunta de chequeo** | ¿Qué diferencia hay entre `new` y `override` en cuanto a qué método se ejecuta cuando la referencia es del tipo base? |

---

#### C5 — Lógica por tipo con `is` en el segundo `foreach`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — segundo `foreach` (líneas con `if (v is Auto a)` y `else if (v is Camioneta c)`) |
| **Síntoma** | Se pregunta por el tipo concreto de cada vehículo antes de decidir qué hacer. |
| **Concepto** | **Polimorfismo / Principio Open-Closed** — la consigna dice explícitamente "ausencia de lógica por tipo (evitar `is`/`as`)". |
| **Por qué está mal** | Si el polimorfismo funciona correctamente, basta con `v.Encender()`. No hace falta saber si `v` es `Auto` o `Camioneta`; el CLR lo resuelve. Usar `is` anula el beneficio del polimorfismo y hace que el código sea frágil ante nuevos tipos. |
| **Pista** | Mirá el primer `foreach`: ya hace lo correcto (llama a `v.Encender()` sin preguntar el tipo). Si el mecanismo de override estuviera bien armado, ¿necesitarías el segundo bloque? |
| **Pregunta de chequeo** | Si mañana agregás una clase `Moto`, ¿cuántos `if` tendrías que agregar al segundo `foreach`? ¿Y al primero? |

---

#### C6 — El mensaje de `Camioneta.Encender()` dice "vehículo" en vez de "camioneta"

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Camioneta.cs` — string del `Console.WriteLine` |
| **Síntoma** | Imprime `"Encendiendo vehículo con cantidad de puertas..."` en lugar de `"Encendiendo camioneta con cantidad de puertas..."`. |
| **Concepto** | **Cumplimiento de la especificación funcional.** |
| **Por qué está mal** | La consigna especifica que `Camioneta` debe imprimir *"Encendiendo camioneta..."*. Aun si el override funcionara, el texto no cumpliría el requisito. |
| **Pista** | Revisá el literal de texto y compará con lo que pide la consigna para cada clase hija. |
| **Pregunta de chequeo** | ¿El mensaje permite distinguir si se encendió un auto o una camioneta? |

---

#### C7 — No existe un proyecto separado de tipo "Class Library" para `Dominio`

| Aspecto | Detalle |
|---|---|
| **Dónde** | Estructura de la solución (`.sln` y carpetas) |
| **Síntoma** | La solución tiene un solo proyecto (`Vehiculos.EstadoA`). `Dominio` es una carpeta dentro del proyecto de consola, no un proyecto independiente. |
| **Concepto** | **Separación en capas / organización de proyectos.** |
| **Por qué está mal** | La consigna pide "un proyecto de librería de clases de nombre Dominio". Esto implica un `.csproj` propio con `<OutputType>` de tipo library, y una referencia `<ProjectReference>` desde la consola. |
| **Pista** | Desde Visual Studio, ¿qué diferencia hay entre "Agregar carpeta" y "Agregar nuevo proyecto" en la solución? Revisá cuántos archivos `.csproj` tenés. |
| **Pregunta de chequeo** | Si alguien quisiera reutilizar tus clases de dominio en otro proyecto, ¿podría hacerlo sin copiar archivos? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Doble punto y coma en el `using`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — `using Vehiculos.EstadoA.Dominio;;` |
| **Síntoma** | Hay dos `;` al final de la sentencia `using`. |
| **Concepto** | Prolijidad sintáctica. |
| **Por qué importa** | Aunque C# lo tolera (compila), denota falta de revisión. En un entorno profesional se marcaría en code review. |
| **Pista** | Revisá esa línea carácter por carácter. |

---

#### M2 — Convención de nombres en propiedades: `camelCase` vs `PascalCase`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — `cantidadPuertas`, `colorChasis` |
| **Síntoma** | Las propiedades públicas están en `camelCase`. |
| **Concepto** | **Convenciones de C#** — las propiedades públicas usan `PascalCase` (`CantidadPuertas`, `ColorChasis`). |
| **Pista** | Consultá las convenciones de nomenclatura de C# en la documentación oficial de Microsoft. |

---

#### M3 — Encapsulación de propiedades

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Vehiculo.cs` — `{ get; set; }` |
| **Síntoma** | Ambas propiedades tienen setter público, permitiendo modificación irrestricta desde fuera. |
| **Concepto** | **Encapsulación** — si un vehículo no debería cambiar su color de chasis después de construido, el setter podría ser `private` o `init`. |
| **Pista** | Preguntate: ¿tiene sentido que alguien haga `miAuto.colorChasis = "Verde"` después de crearlo? |

---

## 3. Preguntas guía para el estudiante

1. ¿Qué palabra clave necesita un método en la clase base para que una clase hija pueda *redefinir* su comportamiento con `override`?

2. ¿Cuál es la diferencia entre *sobrecarga* (overload) y *sobrescritura* (override)? ¿Cuál requiere la misma firma y cuál permite cambiarla?

3. Si declarás `Vehiculo v = new Auto(4, "Rojo")` y llamás `v.Encender()`, ¿qué versión del método se ejecuta? ¿Por qué?

4. ¿Qué efecto tiene la palabra clave `new` en `Camioneta.Encender()` comparada con `override`? ¿En qué escenarios se comportan diferente?

5. Si el polimorfismo funciona correctamente, ¿necesitás preguntar con `is` qué tipo de vehículo es cada elemento de la lista? ¿Cuál es el sentido de tener una `List<Vehiculo>`?

6. ¿Qué diferencia hay entre un método con cuerpo vacío y un método `abstract`? ¿Cuál garantiza que las clases hijas lo implementen?

7. ¿Por qué la consigna pide que `Encender()` en la clase base no tenga comportamiento? ¿Qué problema trae que la base ya imprima algo?

8. Si agregás una clase `Moto : Vehiculo`, ¿cuántos cambios necesitás hacer en `Program.cs` con tu diseño actual? ¿Y cuántos si el polimorfismo estuviera bien implementado?

9. ¿Cuál es la diferencia entre agregar una carpeta dentro de un proyecto y agregar un proyecto nuevo a la solución? ¿Qué implica para la reutilización del código?

10. ¿Qué convención de nombres usa C# para propiedades públicas? ¿Dónde podés verificarlo?

---

## 4. Plan de próximos pasos (verificables)

1. Crear un proyecto de tipo **Class Library** llamado `Dominio` dentro de la solución y mover allí las clases `Vehiculo`, `Auto` y `Camioneta`.
2. Agregar una `<ProjectReference>` desde `Vehiculos.EstadoA` hacia `Dominio`.
3. En `Vehiculo`, vaciar el cuerpo de `Encender()` (o considerar marcarlo `abstract`).
4. En `Vehiculo`, agregar la palabra clave que permite que las clases hijas redefinan `Encender()`.
5. En `Auto`, corregir la firma de `Encender` para que coincida exactamente con la de la clase base (sin parámetros extra).
6. En `Auto`, agregar la palabra clave correcta para indicar que se está redefiniendo el método heredado.
7. En `Camioneta`, reemplazar `new` por la palabra clave correcta de redefinición.
8. En `Camioneta`, corregir el texto del mensaje para que diga "camioneta" en lugar de "vehículo".
9. Verificar que el primer `foreach` en `Program.cs` ahora imprime mensajes distintos para `Auto` y `Camioneta` sin cambiar el código del bucle.
10. Eliminar el segundo `foreach` que usa `is`/`as` — ya no debería ser necesario.
11. Corregir el doble punto y coma en la sentencia `using` de `Program.cs`.
12. Renombrar las propiedades a `PascalCase` (`CantidadPuertas`, `ColorChasis`).
13. Evaluar si los setters deben ser públicos o restringidos (`private set` / `init`).
14. Compilar y ejecutar. Verificar que la salida muestra los mensajes diferenciados para cada tipo de vehículo sin lógica condicional por tipo.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad |
|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + library) | BLOQUEANTE |
| 2 | La referencia entre proyectos está configurada correctamente | BLOQUEANTE |
| 3 | La clase base (`Vehiculo`) tiene las propiedades requeridas con tipos correctos | BLOQUEANTE |
| 4 | `Vehiculo` tiene el método `Encender()` **sin comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE |
| 5 | `Encender()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Vehiculo`) | BLOQUEANTE |
| 7 | Los constructores de las clases hijas delegan al constructor base | BLOQUEANTE |
| 8 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `Encender()` | BLOQUEANTE |
| 9 | La firma de `Encender()` es idéntica en base e hijas (mismo nombre, mismos parámetros) | BLOQUEANTE |
| 10 | Los mensajes impresos coinciden con lo especificado en la consigna | BLOQUEANTE |
| 11 | Se usa `List<Vehiculo>` (no listas de tipos concretos) | BLOQUEANTE |
| 12 | El recorrido es polimórfico: se llama a `Encender()` sin preguntar el tipo | BLOQUEANTE |
| 13 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE |
| 14 | Las propiedades siguen la convención `PascalCase` de C# | NO BLOQUEANTE |
| 15 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE |
| 16 | No hay errores de sintaxis innecesarios (doble `;`, etc.) | NO BLOQUEANTE |
| 17 | Los `using` / `namespace` son correctos y coherentes con la estructura de proyectos | NO BLOQUEANTE |
| 18 | El código compila sin warnings | NO BLOQUEANTE |
| 19 | Si la clase base es `abstract`, ¿se evaluó que no se pueda instanciar directamente? | NO BLOQUEANTE |
| 20 | El `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE |