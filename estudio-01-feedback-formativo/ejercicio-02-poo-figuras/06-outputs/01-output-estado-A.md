# Evaluación Docente — Figuras.EstadoA

---

## 1. Resumen

La entrega demuestra que el estudiante comprende la idea general de herencia: las clases `TrianguloEquilatero`, `Rectangulo` y `Circulo` heredan de `Figura`, los constructores inicializan correctamente las propiedades, y se utiliza una `List<Figura>` para almacenar objetos de distintos tipos. Sin embargo, el mecanismo de **sobrescritura (override)** está completamente ausente, lo que provoca que el polimorfismo **no funcione en tiempo de ejecución**. El método `MostrarInfo` en la clase base no es `virtual`, en `TrianguloEquilatero` y `Rectangulo` se usa `new` (ocultamiento), y en `Circulo` se declara como sobrecarga (distinta firma). Además, la segunda iteración en `Program.cs` introduce lógica por tipo (`is`), algo que la consigna pide evitar explícitamente. No existe validación de dimensiones en ningún constructor, y la fórmula del perímetro en `Rectangulo` es incorrecta. Finalmente, no existe un proyecto de librería de clases separado llamado `Dominio`.

**Aciertos reales:**

1. Las clases `TrianguloEquilatero`, `Rectangulo` y `Circulo` heredan de `Figura` correctamente, y los constructores inicializan sus propiedades específicas.
2. La colección en `Program.cs` está correctamente tipada como `List<Figura>`, y el primer `foreach` intenta un recorrido polimórfico llamando a `f.MostrarInfo()`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

---

#### C1 — El método `MostrarInfo()` en `Figura` no es `virtual`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — método `MostrarInfo()` |
| **Síntoma** | Al recorrer la `List<Figura>` y llamar a `f.MostrarInfo()`, siempre se ejecuta la versión de `Figura`, sin importar el tipo real del objeto. |
| **Concepto** | **Polimorfismo / despacho dinámico** — requiere que el método en la clase base sea `virtual` para que el CLR resuelva la llamada en tiempo de ejecución. |
| **Por qué está mal** | Sin la palabra clave `virtual`, C# no puede hacer *late binding*. Las subclases no tienen un mecanismo legítimo para *sobrescribir* el comportamiento; solo pueden *ocultarlo* o *sobrecargarlo*, ambos insuficientes para polimorfismo. |
| **Pista** | Revisá qué palabra clave necesita un método en la clase base para que sus clases hijas puedan redefinirlo con `override`. |
| **Pregunta de chequeo** | Si declarás una variable como `Figura f = new TrianguloEquilatero(5)` y llamás `f.MostrarInfo()`, ¿qué versión del método se ejecuta y por qué? |

---

#### C2 — `Figura.MostrarInfo()` tiene comportamiento (la consigna pide que no lo tenga)

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — cuerpo de `MostrarInfo()` |
| **Síntoma** | El método imprime `"Mostrando información de la figura"`, pero la consigna dice: *"un método MostrarInfo() sin comportamiento"*. |
| **Concepto** | **Diseño de clases base / abstracción** — un método "sin comportamiento" implica un cuerpo vacío o, mejor aún, un método abstracto. |
| **Por qué está mal** | Si la clase base ya imprime algo, las hijas no necesitan redefinir nada, lo cual anula el propósito del ejercicio (practicar override). Además, si el polimorfismo no funciona, este es el mensaje que siempre se muestra. |
| **Pista** | Pensá en la diferencia entre un método con cuerpo vacío (`{ }`) y un método `abstract`. ¿Cuál de los dos obliga a las clases hijas a dar su propia implementación? |
| **Pregunta de chequeo** | ¿Qué pasa si una clase hija se "olvida" de redefinir `MostrarInfo()`? ¿Preferirías que compile o que el compilador te avise? |

---

#### C3 — `TrianguloEquilatero.MostrarInfo()` y `Rectangulo.MostrarInfo()` usan `new` en vez de `override`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/TrianguloEquilatero.cs` y `Dominio/Rectangulo.cs` — `public new void MostrarInfo()` |
| **Síntoma** | La palabra clave `new` oculta (*hides*) el método de la base en lugar de sobrescribirlo. |
| **Concepto** | **Method hiding vs. overriding** — `new` rompe el polimorfismo; el método que se ejecuta depende del tipo de la *variable*, no del tipo del *objeto*. |
| **Por qué está mal** | Al llamar `f.MostrarInfo()` donde `f` es de tipo `Figura`, se ejecuta `Figura.MostrarInfo()` aunque el objeto sea un `TrianguloEquilatero` o un `Rectangulo`. Solo se ejecutaría la versión específica si la variable fuera del tipo concreto. |
| **Pista** | Reemplazá `new` por otra palabra clave que indique "estoy redefiniendo el comportamiento heredado". Pero ojo: para que eso compile, primero necesitás algo en la clase base. |
| **Pregunta de chequeo** | ¿Qué diferencia hay entre `new` y `override` en cuanto a qué método se ejecuta cuando la referencia es del tipo base? |

---

#### C4 — `Circulo.MostrarInfo(string formato)` es sobrecarga, no sobrescritura

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Circulo.cs` — `public void MostrarInfo(string formato)` |
| **Síntoma** | El método en `Circulo` recibe un parámetro `string formato` que la versión base no tiene. Esto crea un **método nuevo** con distinta firma, no una redefinición del existente. |
| **Concepto** | **Override vs. Overload** — sobrescribir exige la misma firma (nombre + parámetros); cambiar la firma es sobrecargar. |
| **Por qué está mal** | Cuando el `foreach` llama a `f.MostrarInfo()` (sin argumentos), nunca se invoca `Circulo.MostrarInfo(string)`. El compilador resuelve la llamada al método de `Figura`, porque `Circulo` no tiene un `MostrarInfo()` sin parámetros que lo reemplace. |
| **Pista** | Compará la firma de `MostrarInfo` en `Figura` con la de `Circulo`. ¿Son iguales? ¿Qué palabra clave falta en `Circulo` y qué sobra en su lista de parámetros? |
| **Pregunta de chequeo** | Si tenés `Figura f = new Circulo(2.5)`, ¿podés llamar a `f.MostrarInfo("detallado")`? ¿Por qué sí o por qué no? |

---

#### C5 — Fórmula incorrecta del perímetro en `Rectangulo`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Rectangulo.cs` — cálculo de `perimetro` |
| **Síntoma** | El código calcula `perimetro = baseRect * altura`, que es la misma operación que el área. |
| **Concepto** | **Correctitud del dominio / fórmulas matemáticas.** |
| **Por qué está mal** | El perímetro de un rectángulo es `2 × (base + altura)`, no `base × altura`. Con base=4 y altura=3, el área es 12 y el perímetro debería ser 14, pero el código muestra 12 para ambos. |
| **Pista** | Revisá la fórmula del perímetro del rectángulo. ¿Qué operación matemática involucra? ¿Es multiplicación o suma? |
| **Pregunta de chequeo** | Si un rectángulo tiene base 4 y altura 3, ¿cuánto mide su perímetro? ¿Coincide con lo que calcula tu código? |

---

#### C6 — Lógica por tipo con `is` en el segundo `foreach`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — segundo `foreach` (líneas con `if (f is TrianguloEquilatero t)`, `else if (f is Rectangulo r)`, `else if (f is Circulo c)`) |
| **Síntoma** | Se pregunta por el tipo concreto de cada figura antes de decidir qué hacer. |
| **Concepto** | **Polimorfismo / Principio Open-Closed** — la consigna dice explícitamente "ausencia de lógica por tipo (evitar `is`/`as`)". |
| **Por qué está mal** | Si el polimorfismo funciona correctamente, basta con `f.MostrarInfo()`. No hace falta saber si `f` es `TrianguloEquilatero`, `Rectangulo` o `Circulo`; el CLR lo resuelve. Usar `is` anula el beneficio del polimorfismo y hace que el código sea frágil ante nuevos tipos. |
| **Pista** | Mirá el primer `foreach`: ya hace lo correcto (llama a `f.MostrarInfo()` sin preguntar el tipo). Si el mecanismo de override estuviera bien armado, ¿necesitarías el segundo bloque? |
| **Pregunta de chequeo** | Si mañana agregás una clase `Pentagono`, ¿cuántos `if` tendrías que agregar al segundo `foreach`? ¿Y al primero? |

---

#### C7 — Ausencia total de validación de dimensiones en constructores

| Aspecto | Detalle |
|---|---|
| **Dónde** | Constructores de `TrianguloEquilatero`, `Rectangulo` y `Circulo` |
| **Síntoma** | Se puede crear `new Circulo(-5)` o `new Rectangulo(0, -3)` sin que el programa lance ninguna excepción. |
| **Concepto** | **Programación defensiva / invariantes de clase.** |
| **Por qué está mal** | La consigna pide explícitamente: *"Validar en el constructor que las dimensiones sean mayores a 0; de lo contrario, lanzar ArgumentException."* Un radio negativo o un lado igual a cero no tienen sentido geométrico y producirían áreas y perímetros incorrectos. |
| **Pista** | Investigá cómo lanzar una excepción en C# cuando un parámetro no cumple una condición. ¿Qué tipo de excepción es apropiado para un argumento inválido? |
| **Pregunta de chequeo** | ¿Qué debería pasar si alguien intenta crear `new Circulo(0)` o `new TrianguloEquilatero(-2)`? |

---

#### C8 — No existe un proyecto separado de tipo "Class Library" para `Dominio`

| Aspecto | Detalle |
|---|---|
| **Dónde** | Estructura de la solución (`.sln` y carpetas) |
| **Síntoma** | La solución tiene un solo proyecto (`Figuras.EstadoA`). `Dominio` es una carpeta dentro del proyecto de consola, no un proyecto independiente. |
| **Concepto** | **Separación en capas / organización de proyectos.** |
| **Por qué está mal** | La consigna pide "un proyecto de librería de clases de nombre Dominio". Esto implica un `.csproj` propio con output de tipo library, y una referencia `<ProjectReference>` desde la consola. |
| **Pista** | Desde Visual Studio, ¿qué diferencia hay entre "Agregar carpeta" y "Agregar nuevo proyecto" en la solución? Revisá cuántos archivos `.csproj` tenés. |
| **Pregunta de chequeo** | Si alguien quisiera reutilizar tus clases de dominio en otro proyecto, ¿podría hacerlo sin copiar archivos? |

---

### MEJORAS (no bloqueantes)

---

#### M1 — Doble punto y coma en el `using`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Program.cs` — `using Figuras.EstadoA.Dominio;;` |
| **Síntoma** | Hay dos `;` al final de la sentencia `using`. |
| **Concepto** | Prolijidad sintáctica. |
| **Por qué importa** | Aunque C# lo tolera (compila), denota falta de revisión. En un entorno profesional se marcaría en code review. |
| **Pista** | Revisá esa línea carácter por carácter. |

---

#### M2 — Convención de nombres en propiedades: `camelCase` vs `PascalCase`

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/TrianguloEquilatero.cs` — `lado`; `Dominio/Rectangulo.cs` — `baseRect`, `altura`; `Dominio/Circulo.cs` — `radio` |
| **Síntoma** | Las propiedades públicas están en `camelCase`. |
| **Concepto** | **Convenciones de C#** — las propiedades públicas usan `PascalCase` (`Lado`, `Base`, `Altura`, `Radio`). |
| **Pista** | Consultá las convenciones de nomenclatura de C# en la documentación oficial de Microsoft. |

---

#### M3 — Encapsulación de propiedades

| Aspecto | Detalle |
|---|---|
| **Dónde** | Todas las clases hijas — `{ get; set; }` |
| **Síntoma** | Todas las propiedades tienen setter público, permitiendo modificación irrestricta desde fuera. |
| **Concepto** | **Encapsulación** — si un triángulo no debería cambiar su lado después de construido, el setter podría ser `private` o `init`. |
| **Pista** | Preguntate: ¿tiene sentido que alguien haga `miCirculo.radio = -5` después de crearlo? |

---

## 3. Preguntas guía para el estudiante

1. ¿Qué palabra clave necesita un método en la clase base para que una clase hija pueda *redefinir* su comportamiento con `override`?

2. ¿Cuál es la diferencia entre *sobrecarga* (overload) y *sobrescritura* (override)? ¿Cuál requiere la misma firma y cuál permite cambiarla?

3. Si declarás `Figura f = new TrianguloEquilatero(5)` y llamás `f.MostrarInfo()`, ¿qué versión del método se ejecuta? ¿Por qué?

4. ¿Qué efecto tiene la palabra clave `new` en `TrianguloEquilatero.MostrarInfo()` comparada con `override`? ¿En qué escenarios se comportan diferente?

5. Si el polimorfismo funciona correctamente, ¿necesitás preguntar con `is` qué tipo de figura es cada elemento de la lista? ¿Cuál es el sentido de tener una `List<Figura>`?

6. ¿Qué diferencia hay entre un método con cuerpo vacío y un método `abstract`? ¿Cuál garantiza que las clases hijas lo implementen?

7. ¿Por qué la consigna pide que `MostrarInfo()` en la clase base no tenga comportamiento? ¿Qué problema trae que la base ya imprima algo?

8. Si agregás una clase `Pentagono : Figura`, ¿cuántos cambios necesitás hacer en `Program.cs` con tu diseño actual? ¿Y cuántos si el polimorfismo estuviera bien implementado?

9. ¿Cuál es la diferencia entre agregar una carpeta dentro de un proyecto y agregar un proyecto nuevo a la solución? ¿Qué implica para la reutilización del código?

10. ¿Qué debería ocurrir si se intenta construir un `Circulo` con radio 0 o negativo? ¿Cómo expresás eso en código?

---

## 4. Plan de próximos pasos (verificables)

1. Crear un proyecto de tipo **Class Library** llamado `Dominio` dentro de la solución y mover allí las clases `Figura`, `TrianguloEquilatero`, `Rectangulo` y `Circulo`.
2. Agregar una `<ProjectReference>` desde `Figuras.EstadoA` hacia `Dominio`.
3. En `Figura`, vaciar el cuerpo de `MostrarInfo()` (o considerar marcarlo `abstract`).
4. En `Figura`, agregar la palabra clave que permite que las clases hijas redefinan `MostrarInfo()`.
5. En `TrianguloEquilatero` y `Rectangulo`, reemplazar `new` por la palabra clave correcta de redefinición.
6. En `Circulo`, corregir la firma de `MostrarInfo` para que coincida exactamente con la de la clase base (sin parámetros extra), y agregar la palabra clave correcta de redefinición.
7. Corregir la fórmula del perímetro en `Rectangulo`: debe ser `2 × (base + altura)`, no `base × altura`.
8. Agregar validación en los constructores de las tres figuras para que las dimensiones sean mayores a 0, lanzando `ArgumentException` si no se cumple.
9. Verificar que el primer `foreach` en `Program.cs` ahora imprime mensajes distintos para cada figura sin cambiar el código del bucle.
10. Eliminar el segundo `foreach` que usa `is`/`as` — ya no debería ser necesario.
11. Corregir el doble punto y coma en la sentencia `using` de `Program.cs`.
12. Renombrar las propiedades a `PascalCase` (`Lado`, `Base`, `Altura`, `Radio`).
13. Evaluar si los setters deben ser públicos o restringidos (`private set` / `init`).
14. Compilar y ejecutar. Verificar que la salida muestra los mensajes diferenciados para cada tipo de figura sin lógica condicional por tipo.

---

## 5. Checklist reutilizable de corrección docente

| # | Criterio | Severidad |
|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + library) | BLOQUEANTE |
| 2 | La referencia entre proyectos está configurada correctamente | BLOQUEANTE |
| 3 | La clase base (`Figura`) tiene el método `MostrarInfo()` | BLOQUEANTE |
| 4 | `Figura.MostrarInfo()` **no tiene comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE |
| 5 | `MostrarInfo()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Figura`) | BLOQUEANTE |
| 7 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `MostrarInfo()` | BLOQUEANTE |
| 8 | La firma de `MostrarInfo()` es idéntica en base e hijas (mismo nombre, mismos parámetros) | BLOQUEANTE |
| 9 | Los mensajes impresos coinciden con lo especificado en la consigna | BLOQUEANTE |
| 10 | Las fórmulas de área y perímetro son correctas para cada figura | BLOQUEANTE |
| 11 | Se valida en constructores que las dimensiones sean mayores a 0 | BLOQUEANTE |
| 12 | Se lanza `ArgumentException` ante dimensiones inválidas | BLOQUEANTE |
| 13 | Se usa `List<Figura>` (no listas de tipos concretos) | BLOQUEANTE |
| 14 | El recorrido es polimórfico: se llama a `MostrarInfo()` sin preguntar el tipo | BLOQUEANTE |
| 15 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE |
| 16 | Las propiedades siguen la convención `PascalCase` de C# | NO BLOQUEANTE |
| 17 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE |
| 18 | No hay errores de sintaxis innecesarios (doble `;`, etc.) | NO BLOQUEANTE |
| 19 | Los `using` / `namespace` son correctos y coherentes con la estructura de proyectos | NO BLOQUEANTE |
| 20 | El código compila sin warnings | NO BLOQUEANTE |
| 21 | Si la clase base es `abstract`, ¿se evaluó que no se pueda instanciar directamente? | NO BLOQUEANTE |
| 22 | El `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE |
