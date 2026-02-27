namespace Dominio;

public abstract class Vehiculo
{
    public int CantidadPuertas { get; private set; }
    public string ColorChasis { get; private set; }

    public Vehiculo(int cantidadPuertas, string colorChasis)
    {
        CantidadPuertas = cantidadPuertas;
        ColorChasis = colorChasis;
    }

    public abstract void Encender();
}
