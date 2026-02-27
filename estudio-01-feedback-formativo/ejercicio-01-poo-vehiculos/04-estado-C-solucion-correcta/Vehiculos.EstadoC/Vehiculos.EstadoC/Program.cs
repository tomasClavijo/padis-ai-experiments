using Dominio;

var vehiculos = new List<Vehiculo>
{
    new Auto(4, "Rojo"),
    new Auto(2, "Azul"),
    new Camioneta(4, "Negro"),
    new Camioneta(2, "Blanco")
};

foreach (var v in vehiculos)
{
    v.Encender();
}
