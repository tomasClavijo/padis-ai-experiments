namespace Vehiculos.EstadoA.Dominio;

public class Auto : Vehiculo
{
    public Auto(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis)
    {
    }

    public void Encender(string extra)
    {
        Console.WriteLine($"Encendiendo auto con cantidad de puertas {cantidadPuertas} y color de chasis {colorChasis}");
    }
}