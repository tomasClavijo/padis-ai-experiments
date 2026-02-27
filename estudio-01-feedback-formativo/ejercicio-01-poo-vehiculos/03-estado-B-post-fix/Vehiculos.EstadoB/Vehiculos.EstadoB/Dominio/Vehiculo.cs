using System;

namespace Vehiculos.EstadoB.Dominio;

public class Vehiculo
{
    public int CantidadPuertas { get; private set; }
    public string ColorChasis { get; private set; }

    public Vehiculo(int cantidadPuertas, string colorChasis)
    {
        CantidadPuertas = cantidadPuertas;
        ColorChasis = colorChasis;
    }

    public virtual void Encender()
    {
        Console.WriteLine($"Encendiendo vehículo con {CantidadPuertas} puertas y chasis {ColorChasis}");
    }
}