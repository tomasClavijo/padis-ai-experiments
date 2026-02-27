namespace Vehiculos.EstadoA.Dominio;

public class Camioneta : Vehiculo
{
    public Camioneta(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public new void Encender()
    {
        Console.WriteLine($"Encendiendo vehículo con cantidad de puertas {cantidadPuertas} y color de chasis {colorChasis}");
    }
}