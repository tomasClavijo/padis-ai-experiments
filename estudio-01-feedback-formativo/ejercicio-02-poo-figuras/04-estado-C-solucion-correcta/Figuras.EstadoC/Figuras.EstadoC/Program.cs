using Dominio;

var figuras = new List<Figura>
{
    new TrianguloEquilatero(5),
    new TrianguloEquilatero(3),
    new Rectangulo(4, 3),
    new Rectangulo(10, 2),
    new Circulo(2.5),
    new Circulo(1)
};

foreach (var f in figuras)
{
    f.MostrarInfo();
}
