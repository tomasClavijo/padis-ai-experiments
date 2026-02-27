namespace Figuras.EstadoA.Dominio;

public class TrianguloEquilatero : Figura
{
    public double lado { get; set; }

    public TrianguloEquilatero(double lado)
    {
        this.lado = lado;
    }

    public new void MostrarInfo()
    {
        double area = (Math.Sqrt(3) / 4) * lado * lado;
        double perimetro = 3 * lado;
        Console.WriteLine($"Triángulo equilátero — Lado: {lado} | Área: {area} | Perímetro: {perimetro}");
    }
}
