namespace Figuras.EstadoA.Dominio;

public class Circulo : Figura
{
    public double radio { get; set; }

    public Circulo(double radio)
    {
        this.radio = radio;
    }

    public void MostrarInfo(string formato)
    {
        double area = Math.PI * radio * radio;
        double perimetro = 2 * Math.PI * radio;
        Console.WriteLine($"Círculo — Radio: {radio} | Área: {area} | Perímetro: {perimetro}");
    }
}
