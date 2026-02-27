using Figuras.EstadoA.Dominio;;

var figuras = new List<Figura>();

figuras.Add(new TrianguloEquilatero(5));
figuras.Add(new Rectangulo(4, 3));
figuras.Add(new Circulo(2.5));

foreach (var f in figuras)
{
    f.MostrarInfo();
}

Console.WriteLine("----");

foreach (var f in figuras)
{
    if (f is TrianguloEquilatero t)
    {
        t.MostrarInfo();
    }
    else if (f is Rectangulo r)
    {
        r.MostrarInfo();
    }
    else if (f is Circulo c)
    {
        c.MostrarInfo("detallado");
    }
}
