namespace Figuras.EstadoA.Dominio;

public class Rectangulo : Figura
{
    public double baseRect { get; set; }
    public double altura { get; set; }

    public Rectangulo(double baseRect, double altura)
    {
        this.baseRect = baseRect;
        this.altura = altura;
    }

    public new void MostrarInfo()
    {
        double area = baseRect * altura;
        double perimetro = baseRect * altura;
        Console.WriteLine($"Rectángulo — Base: {baseRect}, Altura: {altura} | Área: {area} | Perímetro: {perimetro}");
    }
}
