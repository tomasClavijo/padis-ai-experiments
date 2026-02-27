# Consigna – POO Figuras Geométricas

## Enunciado

Crear una aplicación de consola en Visual Studio utilizando C# y .NET 10.

1) Crear un proyecto de librería de clases de nombre **Dominio** y agregar una clase `Figura`.  
   La clase deberá tener un método `MostrarInfo()` **sin comportamiento**.

2) Dentro del mismo proyecto agregar tres clases, `TrianguloEquilatero`, `Rectangulo` y `Circulo` (que heredan de `Figura`), cada una con sus propiedades específicas:
- `TrianguloEquilatero`: `Lado` (double)
- `Rectangulo`: `Base` (double) y `Altura` (double)
- `Circulo`: `Radio` (double)

y definir `MostrarInfo()` para que imprima:
- "Triángulo equilátero — Lado: {Lado} | Área: {área} | Perímetro: {perímetro}"
- "Rectángulo — Base: {Base}, Altura: {Altura} | Área: {área} | Perímetro: {perímetro}"
- "Círculo — Radio: {Radio} | Área: {área} | Perímetro: {perímetro}"

Fórmulas:
- Triángulo equilátero: área = (√3 / 4) × lado², perímetro = 3 × lado
- Rectángulo: área = base × altura, perímetro = 2 × (base + altura)
- Círculo: área = π × radio², perímetro = 2 × π × radio

Validar en el constructor que las dimensiones sean mayores a 0; de lo contrario, lanzar `ArgumentException`.

3) En el proyecto de consola, crear una lista de `Figura`, inicializarlas y mostrar su información.

## Observación didáctica

La consigna busca evaluar especialmente:

- herencia simple,
- sobrescritura (override) y polimorfismo,
- tipado de colecciones como `List<Figura>`,
- ausencia de lógica por tipo (evitar `is/as` para decidir comportamiento),
- validación de estado en constructores (programación defensiva).
