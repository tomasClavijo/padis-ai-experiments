namespace Figuras.EstadoB.Dominio;

public class Rectangulo : Figura
{
    public double Base { get; private set; }
    public double Altura { get; private set; }

    public Rectangulo(double baseRect, double altura)
    {
        Base = baseRect;
        Altura = altura;
    }

    public override void MostrarInfo()
    {
        double area = Base * Altura;
        double perimetro = 2 * (Base + Altura);
        Console.WriteLine($"Rectángulo — Base: {Base:F2}, Altura: {Altura:F2} | Área: {area:F2} | Perímetro: {perimetro:F2}");
    }
}
