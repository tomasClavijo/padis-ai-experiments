namespace Vehiculos.EstadoB.Dominio;

public class Auto : Vehiculo
{
    public Auto(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public override void Encender()
    {
        Console.WriteLine($"Encendiendo auto con {CantidadPuertas} puertas y chasis {ColorChasis}");
    }

    public void Encender(string extra)
    {
        Console.WriteLine($"Encendiendo auto ({extra}) con {CantidadPuertas} puertas y chasis {ColorChasis}");
    }
}