namespace Dominio;

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
        Console.WriteLine($"Círculo — Radio: {Radio} | Área: {area} | Perímetro: {perimetro}");
    }
}
