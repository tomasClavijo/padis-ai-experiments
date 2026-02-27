namespace Vehiculos.EstadoB.Dominio;

public class Camioneta : Vehiculo
{
    public Camioneta(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public override void Encender()
    {
        Console.WriteLine($"Encendiendo camioneta con {CantidadPuertas} puertas y chasis {ColorChasis}");
    }
}