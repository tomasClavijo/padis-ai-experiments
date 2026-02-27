namespace Dominio;

public class Auto : Vehiculo
{
    public Auto(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public override void Encender()
    {
        Console.WriteLine($"Encendiendo auto con cantidad de puertas {CantidadPuertas} y color de chasis {ColorChasis}");
    }
}
