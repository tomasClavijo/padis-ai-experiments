namespace Dominio;

public class Camioneta : Vehiculo
{
    public Camioneta(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public override void Encender()
    {
        Console.WriteLine($"Encendiendo camioneta con cantidad de puertas {CantidadPuertas} y color de chasis {ColorChasis}");
    }
}
