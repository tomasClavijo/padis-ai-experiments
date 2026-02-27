using Vehiculos.EstadoA.Dominio;;

var vehiculos = new List<Vehiculo>();

vehiculos.Add(new Auto(4, "Rojo"));
vehiculos.Add(new Camioneta(2, "Negro"));

foreach (var v in vehiculos)
{
    v.Encender();
}

Console.WriteLine("----");

foreach (var v in vehiculos)
{
    if (v is Auto a)
    {
        a.Encender("extra");
    }
    else if (v is Camioneta c)
    {
        c.Encender();
    }
}