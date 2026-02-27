using Vehiculos.EstadoB.Dominio;

var vehiculos = new List<Vehiculo>
{
    new Auto(4, "Rojo"),
    new Camioneta(2, "Negro")
};

foreach (var v in vehiculos)
{
    v.Encender();
}

Console.WriteLine("----");

foreach (var v in vehiculos)
{
    if (v is Auto)
    {
        Console.WriteLine("Es un auto!");
        v.Encender();
    }
    else if (v is Camioneta)
    {
        Console.WriteLine("Es una camioneta!");
        v.Encender();
    }
}