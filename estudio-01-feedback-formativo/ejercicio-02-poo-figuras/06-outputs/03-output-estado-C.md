# Evaluación Docente — Tercera Revisión (Re-entrega) — Figuras.EstadoC

---

## 1. Resumen

La entrega cumple **todos los requisitos de la consigna** de forma correcta y limpia. El estudiante resolvió la totalidad de los problemas conceptuales que se habían señalado en revisiones anteriores. La clase `Figura` es ahora `abstract` con un método `abstract void MostrarInfo()` — sin comportamiento, tal como pide el enunciado. `TrianguloEquilatero`, `Rectangulo` y `Circulo` heredan correctamente, usan `override` con firma idéntica, y las fórmulas de área y perímetro son correctas. Cada constructor valida que las dimensiones sean mayores a 0, lanzando `ArgumentException` si no se cumple. El `Program.cs` utiliza `List<Figura>` con un recorrido puramente polimórfico, sin rastro de `is`, `as`, ni lógica por tipo. Además, la estructura de la solución incluye **dos proyectos separados** (`Figuras.EstadoC` como consola y `Dominio` como class library) con la referencia entre proyectos correctamente configurada. **No se detectan errores críticos ni bloqueantes.**

**Aciertos nuevos concretos:**

1. `Figura` es ahora una clase `abstract` con `MostrarInfo()` declarado como `abstract` — esto garantiza a nivel de compilador que toda subclase implemente el método, y cumple la consigna de "sin comportamiento".
2. La solución está correctamente separada en dos proyectos (`Dominio` como class library + `Figuras.EstadoC` como consola) con `<ProjectReference>` configurada en el `.csproj`.

---

## 2. Hallazgos priorizados

### CRÍTICOS (bloqueantes)

**No se detectan errores críticos.** La solución cumple todos los requisitos de la consigna en sus aspectos conceptuales y estructurales.

---

### MEJORAS (no bloqueantes)

Estas observaciones son **opcionales** y no afectan la corrección ni el cumplimiento de la consigna. Se ofrecen como oportunidades de profundización.

---

#### M1 — Considerar validaciones más específicas con excepciones tipadas

| Aspecto | Detalle |
|---|---|
| **Dónde** | Constructores de `TrianguloEquilatero`, `Rectangulo` y `Circulo` |
| **Síntoma** | Se usa `ArgumentException` genérico. C# ofrece `ArgumentOutOfRangeException` para valores fuera de rango. |
| **Concepto** | **Jerarquía de excepciones / programación defensiva.** |
| **Explicación docente** | `ArgumentOutOfRangeException` hereda de `ArgumentException` y comunica más precisamente que el problema es un valor numérico fuera del rango esperado, no un argumento inválido en general. No es un error usar `ArgumentException` (la consigna lo pide así), pero en un diseño más refinado, la excepción más específica sería la preferible. |
| **Pista** | ¿Qué diferencia hay entre `ArgumentException` y `ArgumentOutOfRangeException`? ¿Cuándo usarías una vs. la otra? |
| **Pregunta de chequeo** | Si un `catch` atrapa `ArgumentException`, ¿también atrapa `ArgumentOutOfRangeException`? ¿Por qué? |

---

#### M2 — El constructor de `Figura` es `protected`, pero podría documentarse la intención

| Aspecto | Detalle |
|---|---|
| **Dónde** | `Dominio/Figura.cs` — constructor `protected Figura()` |
| **Síntoma** | El constructor `protected` es correcto para una clase `abstract`, pero un comentario XML o una convención de equipo podrían aclarar la intención. |
| **Concepto** | **Modificadores de acceso en clases abstractas.** |
| **Explicación docente** | Excelente decisión usar `protected`. Como `Figura` es `abstract`, nadie puede hacer `new Figura()`. El constructor `protected` refuerza semánticamente que solo las subclases lo invocan. Esto es una buena práctica que va más allá de lo requerido. |

---

#### M3 — Oportunidad de introducir una interfaz `IFigura`

| Aspecto | Detalle |
|---|---|
| **Dónde** | Diseño general |
| **Síntoma** | La jerarquía usa solo herencia de clase. |
| **Concepto** | **Interfaces vs. clases abstractas.** |
| **Explicación docente** | Esto no es un error para esta consigna (que pide herencia), pero en un diseño más avanzado podría considerarse una interfaz `IFigura` con `MostrarInfo()`. Esto permitiría que clases que no comparten una jerarquía de herencia también puedan participar del polimorfismo. Es un tema para explorar en ejercicios futuros. |

---

## 3. Problemas previamente resueltos

La entrega resuelve **correctamente** todos los conceptos que típicamente fallan en este ejercicio:

| # | Concepto | Estado |
|---|---|---|
| 1 | `MostrarInfo()` en la clase base es `abstract` → sin comportamiento | Correcto |
| 2 | `Figura` está marcada como `abstract` → no se puede instanciar directamente | Correcto |
| 3 | `TrianguloEquilatero`, `Rectangulo` y `Circulo` usan `override` (no `new`, no sobrecarga) | Correcto |
| 4 | La firma de `MostrarInfo()` es idéntica en base e hijas (sin parámetros extra) | Correcto |
| 5 | No hay sobrecargas residuales innecesarias | Correcto |
| 6 | Las fórmulas de área y perímetro son correctas para las tres figuras | Correcto |
| 7 | Todos los constructores validan dimensiones > 0 y lanzan `ArgumentException` | Correcto |
| 8 | Los mensajes coinciden textualmente con la consigna | Correcto |
| 9 | `Program.cs` usa `List<Figura>` (tipado por la abstracción) | Correcto |
| 10 | Un solo `foreach` con `f.MostrarInfo()` — recorrido polimórfico puro | Correcto |
| 11 | No hay `is`, `as`, `typeof` ni `GetType` — sin lógica por tipo | Correcto |
| 12 | Existen dos proyectos separados (consola + class library) | Correcto |
| 13 | `<ProjectReference>` configurada desde consola hacia `Dominio` | Correcto |
| 14 | Propiedades en `PascalCase` (`Lado`, `Base`, `Altura`, `Radio`) | Correcto |
| 15 | Setters con visibilidad restringida (`private set`) | Correcto |
| 16 | Constructor de `Figura` es `protected` (buena práctica en clase abstracta) | Correcto |
| 17 | No hay `using` redundantes ni errores sintácticos | Correcto |
| 18 | `Program.cs` es conciso, sin código muerto ni bloques redundantes | Correcto |

---

## 4. Preguntas guía para el estudiante

Estas preguntas no señalan errores: son disparadores para profundizar conceptos a partir de una solución que ya funciona correctamente.

1. ¿Por qué elegiste `abstract` en vez de `virtual` con cuerpo vacío para `MostrarInfo()` en `Figura`? ¿Qué ventaja concreta te da `abstract` frente a `virtual` si una subclase se olvida de implementar el método?

2. Si mañana necesitás agregar `Pentagono : Figura`, ¿cuántos archivos tenés que tocar? ¿El compilador te obliga a implementar algo? ¿Qué principio de diseño se manifiesta?

3. ¿Qué pasaría si intentaras escribir `new Figura()` directamente en `Program.cs`? ¿Por qué el compilador lo rechaza?

4. Tu lista está tipada como `List<Figura>`, pero contiene objetos de distintos tipos concretos. ¿Cómo sabe el CLR (runtime) cuál versión de `MostrarInfo()` ejecutar para cada elemento? ¿Cómo se llama ese mecanismo?

5. Si necesitaras que `Figura` tuviera un método `Describir()` con un comportamiento por defecto (igual para todos), pero que algunas hijas pudieran personalizar, ¿usarías `abstract` o `virtual`? ¿Por qué?

6. ¿Qué ventaja tiene que `Dominio` sea un proyecto separado (class library) en vez de una carpeta dentro del proyecto de consola? ¿En qué escenarios concretos aprovecharías esa separación?

7. ¿Qué significa que los setters de las propiedades sean `private set`? ¿Quién puede modificar esos valores y cuándo? ¿Conocés la alternativa `init`? ¿En qué se diferencia?

8. ¿Qué pasa si intentás crear `new Circulo(-5)`? ¿Y `new Rectangulo(0, 3)`? ¿Por qué es importante que la validación ocurra en el constructor y no después?

---

## 5. Plan de próximos pasos (verificables)

Dado que la solución está completa y correcta, los siguientes pasos apuntan a **profundizar y extender** los conceptos aprendidos.

1. Agregar una nueva clase `Pentagono : Figura` al proyecto `Dominio`. Verificar que el compilador obliga a implementar `MostrarInfo()`. Agregarla a la lista en `Program.cs` sin modificar el `foreach`.
2. Intentar escribir `new Figura()` en `Program.cs` y observar el error de compilación. Anotar el mensaje de error y explicar por qué ocurre.
3. Agregar un método `virtual string ObtenerTipo()` en `Figura` con un comportamiento por defecto (ej. retornar `"Figura genérica"`). Sobrescribirlo solo en `TrianguloEquilatero`. Verificar que `Rectangulo` y `Circulo` usan la versión base y `TrianguloEquilatero` usa la propia.
4. Cambiar las excepciones de `ArgumentException` a `ArgumentOutOfRangeException` y verificar que el comportamiento sigue siendo correcto.
5. Crear un tercer proyecto de tipo **xUnit** o **NUnit** en la solución. Escribir tests que verifiquen: (a) que las fórmulas son correctas, (b) que los constructores lanzan excepción con valores inválidos, (c) que `MostrarInfo()` imprime el texto esperado.
6. Investigar la diferencia entre `private set` e `init` en C#. Evaluar si `init` sería más apropiado para propiedades que solo se asignan en la construcción.
7. Investigar el concepto de **clases selladas** (`sealed`). ¿Tiene sentido marcar `TrianguloEquilatero`, `Rectangulo` y `Circulo` como `sealed` si no se espera que tengan subclases?
8. Reflexionar: si la consigna pidiera que `Figura` también pudiera existir como objeto concreto (no solo figuras específicas), ¿podrías seguir usando `abstract`? ¿Qué alternativa usarías?
9. Leer sobre el **principio Open-Closed** (OCP) de SOLID. Identificar en tu solución dónde se cumple: ¿podés agregar nuevos tipos de figura sin modificar `Program.cs`?
10. Explorar cómo se podrían implementar métodos adicionales `CalcularArea()` y `CalcularPerimetro()` que retornen `double` en vez de solo imprimir. ¿Cómo cambiaría el diseño? ¿Qué ventajas tendría para testing?

---

## 6. Checklist reutilizable de corrección docente

| # | Criterio | Severidad | Estado en esta entrega |
|---|---|---|---|
| 1 | Existen los proyectos separados según la consigna (consola + class library) | BLOQUEANTE | OK |
| 2 | La referencia entre proyectos (`<ProjectReference>`) está configurada | BLOQUEANTE | OK |
| 3 | La clase base tiene el método `MostrarInfo()` | BLOQUEANTE | OK |
| 4 | `MostrarInfo()` en la clase base **no tiene comportamiento** (cuerpo vacío o abstracto) | BLOQUEANTE | OK |
| 5 | `MostrarInfo()` en la clase base está marcado como `virtual` o `abstract` | BLOQUEANTE | OK |
| 6 | Las clases hijas heredan de la clase base correctamente (`: Figura`) | BLOQUEANTE | OK |
| 7 | Las clases hijas usan `override` (no `new`, no sobrecarga) para redefinir `MostrarInfo()` | BLOQUEANTE | OK |
| 8 | La firma de `MostrarInfo()` es idéntica en base e hijas (mismo nombre, mismos parámetros) | BLOQUEANTE | OK |
| 9 | Los mensajes impresos coinciden **textualmente** con la especificación de la consigna | BLOQUEANTE | OK |
| 10 | Las fórmulas de área y perímetro son correctas para cada figura | BLOQUEANTE | OK |
| 11 | Se valida en constructores que las dimensiones sean mayores a 0 (todas las figuras) | BLOQUEANTE | OK |
| 12 | Se lanza `ArgumentException` ante dimensiones inválidas | BLOQUEANTE | OK |
| 13 | Se usa `List<Figura>` (no listas de tipos concretos) | BLOQUEANTE | OK |
| 14 | El recorrido es polimórfico: se llama a `MostrarInfo()` sin preguntar el tipo | BLOQUEANTE | OK |
| 15 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | BLOQUEANTE | OK |
| 16 | No hay métodos sobrantes/residuales no requeridos por la consigna | NO BLOQUEANTE | OK |
| 17 | Las propiedades siguen la convención `PascalCase` de C# | NO BLOQUEANTE | OK |
| 18 | Se evalúa la visibilidad de los setters (encapsulación) | NO BLOQUEANTE | OK |
| 19 | No hay errores de sintaxis innecesarios (doble `;`, `using` sobrantes, etc.) | NO BLOQUEANTE | OK |
| 20 | Los `using` / `namespace` son correctos y coherentes con la estructura | NO BLOQUEANTE | OK |
| 21 | El código compila sin warnings | NO BLOQUEANTE | OK |
| 22 | `Program.cs` es conciso y no tiene código muerto o redundante | NO BLOQUEANTE | OK |

---

**Valoración global: APROBADO — Todos los criterios cumplidos.**

La solución demuestra comprensión sólida de herencia, abstracción, polimorfismo por override, tipado de colecciones por la abstracción, validación defensiva en constructores, y separación en proyectos. El código es limpio, conciso y cumple la consigna en todos sus puntos. Las únicas observaciones son mejoras opcionales de diseño avanzado (excepciones más específicas, interfaces, testing) que exceden el alcance de este ejercicio pero sirven como guía para seguir creciendo.
