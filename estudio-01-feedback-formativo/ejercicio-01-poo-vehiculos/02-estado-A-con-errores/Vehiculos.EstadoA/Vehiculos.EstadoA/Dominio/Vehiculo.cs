using System;

namespace Vehiculos.EstadoA.Dominio;

public class Vehiculo
{
    public int cantidadPuertas { get; set; }
    public string colorChasis { get; set; }

    public Vehiculo(int cantidadPuertas, string colorChasis)
    {
        this.cantidadPuertas = cantidadPuertas;
        this.colorChasis = colorChasis;
    }

    public void Encender()
    {
        Console.WriteLine($"Encendiendo vehículo con {cantidadPuertas} puertas y chasis {colorChasis}");
    }
}