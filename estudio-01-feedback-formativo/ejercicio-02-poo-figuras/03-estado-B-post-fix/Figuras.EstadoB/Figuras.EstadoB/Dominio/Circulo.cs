namespace Figuras.EstadoB.Dominio;

public class Circulo : Figura
{
    public double Radio { get; private set; }

    public Circulo(double radio)
    {
        if (radio <= 0)
            throw new ArgumentException("El radio debe ser mayor a 0.");
        Radio = radio;
    }

    public override void MostrarInfo()
    {
        double area = Math.PI * Radio * Radio;
        double perimetro = 2 * Math.PI * Radio;
        Console.WriteLine($"Círculo — Radio: {Radio:F2} | Área: {area:F2} | Perímetro: {perimetro:F2}");
    }

    public void MostrarInfo(string formato)
    {
        Console.WriteLine($"Círculo ({formato}) — Radio: {Radio:F2} | Área: {Math.PI * Radio * Radio:F2} | Perímetro: {2 * Math.PI * Radio:F2}");
    }
}
