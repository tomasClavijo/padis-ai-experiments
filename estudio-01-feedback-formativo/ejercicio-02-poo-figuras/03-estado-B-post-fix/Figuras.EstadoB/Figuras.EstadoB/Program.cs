using Figuras.EstadoB.Dominio;

var figuras = new List<Figura>
{
    new TrianguloEquilatero(5),
    new Rectangulo(4, 3),
    new Circulo(2.5)
};

foreach (var f in figuras)
{
    f.MostrarInfo();
}

Console.WriteLine("----");

foreach (var f in figuras)
{
    if (f is TrianguloEquilatero)
    {
        Console.WriteLine("Es un triángulo!");
        f.MostrarInfo();
    }
    else if (f is Rectangulo)
    {
        Console.WriteLine("Es un rectángulo!");
        f.MostrarInfo();
    }
    else if (f is Circulo)
    {
        Console.WriteLine("Es un círculo!");
        f.MostrarInfo();
    }
}
