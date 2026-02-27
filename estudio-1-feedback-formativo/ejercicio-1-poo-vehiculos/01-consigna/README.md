# Consigna – POO Vehículos

## Enunciado

Crear una aplicación de consola en Visual Studio de nombre **DA1** utilizando C# y .NET 8.

1) Crear un proyecto de librería de clases de nombre **Dominio** y agregar una clase `Vehiculo`.  
   La clase deberá tener dos propiedades:
- `cantidadPuertas` (int)
- `colorChasis` (string)

y un método `Encender()` **sin comportamiento**.

2) Dentro del mismo proyecto agregar dos clases, `Auto` y `Camioneta` (que heredan de `Vehiculo`), y definir el método `Encender()` para que imprima:
- "Encendiendo auto con cantidad de puertas x y color de chasis y"
- "Encendiendo camioneta con cantidad de puertas x y color de chasis y"

3) En el proyecto de consola, crear una lista de `Vehiculo`, inicializarlos y encenderlos.

## Observación didáctica

La consigna busca evaluar especialmente:

- herencia simple,
- sobrescritura (override) y polimorfismo,
- tipado de colecciones como `List<Vehiculo>`,
- ausencia de lógica por tipo (evitar `is/as` para decidir comportamiento).