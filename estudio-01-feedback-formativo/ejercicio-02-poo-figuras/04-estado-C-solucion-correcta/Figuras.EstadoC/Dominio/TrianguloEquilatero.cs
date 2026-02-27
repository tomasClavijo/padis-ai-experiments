namespace Dominio;

public class TrianguloEquilatero : Figura
{
    public double Lado { get; private set; }

    public TrianguloEquilatero(double lado)
    {
        if (lado <= 0)
            throw new ArgumentException("El lado debe ser mayor a 0.");
        Lado = lado;
    }

    public override void MostrarInfo()
    {
        double area = (Math.Sqrt(3) / 4) * Lado * Lado;
        double perimetro = 3 * Lado;
        Console.WriteLine($"Triángulo equilátero — Lado: {Lado} | Área: {area} | Perímetro: {perimetro}");
    }
}
