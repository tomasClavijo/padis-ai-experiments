namespace Dominio;

public class Rectangulo : Figura
{
    public double Base { get; private set; }
    public double Altura { get; private set; }

    public Rectangulo(double baseRect, double altura)
    {
        if (baseRect <= 0)
            throw new ArgumentException("La base debe ser mayor a 0.");
        if (altura <= 0)
            throw new ArgumentException("La altura debe ser mayor a 0.");
        Base = baseRect;
        Altura = altura;
    }

    public override void MostrarInfo()
    {
        double area = Base * Altura;
        double perimetro = 2 * (Base + Altura);
        Console.WriteLine($"Rectángulo — Base: {Base}, Altura: {Altura} | Área: {area} | Perímetro: {perimetro}");
    }
}
