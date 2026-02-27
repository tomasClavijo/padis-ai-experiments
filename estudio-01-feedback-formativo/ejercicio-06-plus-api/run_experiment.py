"""
Ejercicio 06 — Evaluación por rúbrica vía API

Ejecuta dos llamadas a la API de Anthropic (Claude) para evaluar el ejercicio
POO Vehículos contra una rúbrica de 13 criterios.

Uso:
    set ANTHROPIC_API_KEY=<clave>
    py run_experiment.py
"""

import anthropic
import datetime
import os

MODEL = "claude-sonnet-4-20250514"

SYSTEM_PROMPT = (
    "Sos un verificador automático de rúbrica para una cátedra universitaria de Programación.\n"
    "\n"
    "Vas a recibir:\n"
    "1. La CONSIGNA del ejercicio.\n"
    "2. La RÚBRICA: una lista numerada de criterios de evaluación.\n"
    "3. El CÓDIGO del estudiante.\n"
    "\n"
    "Tu tarea es evaluar el código contra cada criterio de la rúbrica, "
    "únicamente mediante lectura estática (sin ejecutar).\n"
    "\n"
    "REGLAS ESTRICTAS:\n"
    "\n"
    "- Si TODOS los criterios de la rúbrica se cumplen, respondé ÚNICAMENTE: SIN ERRORES\n"
    "- Si algún criterio NO se cumple, listá SOLO los números de los criterios que fallan, "
    "uno por línea, con el formato:\n"
    "  #N — NO CUMPLE — [motivo en máximo 10 palabras]\n"
    "- No agregues criterios que no estén en la rúbrica.\n"
    "- No des soluciones, pistas, código, preguntas ni sugerencias.\n"
    "- No incluyas los criterios que SÍ se cumplen.\n"
    "- No incluyas encabezados, separadores ni texto adicional."
)

CONSIGNA = (
    "Crear una aplicación de consola en Visual Studio utilizando C# y .NET 10.\n"
    "\n"
    "1) Crear un proyecto de librería de clases de nombre Dominio y agregar una clase Vehiculo.\n"
    "   La clase deberá tener dos propiedades:\n"
    "   - cantidadPuertas (int)\n"
    "   - colorChasis (string)\n"
    "   y un método Encender() sin comportamiento.\n"
    "\n"
    "2) Dentro del mismo proyecto agregar dos clases, Auto y Camioneta (que heredan de Vehiculo),\n"
    "   y definir el método Encender() para que imprima:\n"
    '   - "Encendiendo auto con cantidad de puertas x y color de chasis y"\n'
    '   - "Encendiendo camioneta con cantidad de puertas x y color de chasis y"\n'
    "\n"
    "3) En el proyecto de consola, crear una lista de Vehiculo, inicializarlos y encenderlos.\n"
    "\n"
    "La consigna evalúa especialmente:\n"
    "- herencia simple,\n"
    "- sobrescritura (override) y polimorfismo,\n"
    "- tipado de colecciones como List<Vehiculo>,\n"
    "- ausencia de lógica por tipo (evitar is/as para decidir comportamiento)."
)

RUBRICA = (
    "1. Existen dos proyectos separados: consola + librería de clases (Dominio)\n"
    "2. La referencia entre proyectos está configurada correctamente\n"
    "3. La clase base Vehiculo tiene las propiedades cantidadPuertas (int) y colorChasis (string)\n"
    "4. Encender() en Vehiculo no tiene comportamiento (cuerpo vacío o abstract)\n"
    "5. Encender() en Vehiculo está marcado como virtual o abstract\n"
    "6. Auto y Camioneta heredan de Vehiculo\n"
    "7. Los constructores de Auto y Camioneta delegan al constructor base\n"
    "8. Auto y Camioneta usan override (no new, no sobrecarga) para redefinir Encender()\n"
    "9. La firma de Encender() es idéntica en la base y en las hijas\n"
    "10. Los mensajes impresos coinciden con la especificación de la consigna\n"
    "11. Se usa List<Vehiculo> para almacenar los objetos\n"
    "12. El recorrido es polimórfico: se llama a Encender() sin preguntar el tipo\n"
    "13. No hay lógica por tipo (is, as, typeof, GetType) para decidir comportamiento"
)

# ── Código del estudiante: Estado A (con errores intencionales) ──────────────

ESTADO_A = """\
=== Estructura del proyecto ===
Un solo proyecto: Vehiculos.EstadoA (consola). Dominio es una carpeta dentro del proyecto.

=== Vehiculo.cs ===
using System;
namespace Vehiculos.EstadoA.Dominio;
public class Vehiculo
{
    public int cantidadPuertas { get; set; }
    public string colorChasis { get; set; }
    public Vehiculo(int cantidadPuertas, string colorChasis)
    {
        this.cantidadPuertas = cantidadPuertas;
        this.colorChasis = colorChasis;
    }
    public void Encender()
    {
        Console.WriteLine($"Encendiendo vehículo con {cantidadPuertas} puertas y chasis {colorChasis}");
    }
}

=== Auto.cs ===
namespace Vehiculos.EstadoA.Dominio;
public class Auto : Vehiculo
{
    public Auto(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis) { }
    public void Encender(string extra)
    {
        Console.WriteLine($"Encendiendo auto con cantidad de puertas {cantidadPuertas} y color de chasis {colorChasis}");
    }
}

=== Camioneta.cs ===
namespace Vehiculos.EstadoA.Dominio;
public class Camioneta : Vehiculo
{
    public Camioneta(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis) { }
    public new void Encender()
    {
        Console.WriteLine($"Encendiendo vehículo con cantidad de puertas {cantidadPuertas} y color de chasis {colorChasis}");
    }
}

=== Program.cs ===
using Vehiculos.EstadoA.Dominio;;
var vehiculos = new List<Vehiculo>();
vehiculos.Add(new Auto(4, "Rojo"));
vehiculos.Add(new Camioneta(2, "Negro"));
foreach (var v in vehiculos) { v.Encender(); }
Console.WriteLine("----");
foreach (var v in vehiculos)
{
    if (v is Auto a) { a.Encender("extra"); }
    else if (v is Camioneta c) { c.Encender(); }
}"""

# ── Código del estudiante: Estado C (solución correcta) ─────────────────────

ESTADO_C = """\
=== Estructura del proyecto ===
Dos proyectos: Vehiculos.EstadoC (consola) y Dominio (class library).
El .csproj de la consola tiene <ProjectReference> hacia Dominio.

=== Vehiculo.cs (proyecto Dominio) ===
namespace Dominio;
public abstract class Vehiculo
{
    public int CantidadPuertas { get; private set; }
    public string ColorChasis { get; private set; }
    public Vehiculo(int cantidadPuertas, string colorChasis)
    {
        CantidadPuertas = cantidadPuertas;
        ColorChasis = colorChasis;
    }
    public abstract void Encender();
}

=== Auto.cs (proyecto Dominio) ===
namespace Dominio;
public class Auto : Vehiculo
{
    public Auto(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis) { }
    public override void Encender()
    {
        Console.WriteLine($"Encendiendo auto con cantidad de puertas {CantidadPuertas} y color de chasis {ColorChasis}");
    }
}

=== Camioneta.cs (proyecto Dominio) ===
namespace Dominio;
public class Camioneta : Vehiculo
{
    public Camioneta(int cantidadPuertas, string colorChasis)
        : base(cantidadPuertas, colorChasis) { }
    public override void Encender()
    {
        Console.WriteLine($"Encendiendo camioneta con cantidad de puertas {CantidadPuertas} y color de chasis {ColorChasis}");
    }
}

=== Program.cs (proyecto consola) ===
using Dominio;
var vehiculos = new List<Vehiculo>
{
    new Auto(4, "Rojo"),
    new Auto(2, "Azul"),
    new Camioneta(4, "Negro"),
    new Camioneta(2, "Blanco")
};
foreach (var v in vehiculos) { v.Encender(); }"""


def build_user_message(code: str) -> str:
    return f"CONSIGNA:\n{CONSIGNA}\n\nRÚBRICA:\n{RUBRICA}\n\nCÓDIGO DEL ESTUDIANTE:\n{code}"


def call_api(label: str, code: str) -> tuple[str, int, int]:
    print(f"\n{'=' * 60}")
    print(f"Ejecutando: {label}")
    print(f"{'=' * 60}")

    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

    message = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": build_user_message(code)}],
    )

    text = message.content[0].text
    tokens_in = message.usage.input_tokens
    tokens_out = message.usage.output_tokens

    print(f"Tokens entrada: {tokens_in}")
    print(f"Tokens salida:  {tokens_out}")
    print(f"Stop reason:    {message.stop_reason}")
    print(f"\nRespuesta:\n{text}")

    return text, tokens_in, tokens_out


def save_output(filename: str, title: str, response: str, tokens_in: int, tokens_out: int):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(script_dir, filename)
    timestamp = datetime.datetime.now().isoformat()

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# {title}\n\n")
        f.write(f"- **Modelo**: {MODEL}\n")
        f.write(f"- **Fecha**: {timestamp}\n")
        f.write(f"- **Tokens entrada**: {tokens_in}\n")
        f.write(f"- **Tokens salida**: {tokens_out}\n\n")
        f.write("## Respuesta del modelo\n\n")
        f.write(response)
        f.write("\n")


def main():
    resp_a, tin_a, tout_a = call_api("Estado A (con errores)", ESTADO_A)
    save_output(
        "01-output-estado-A.md",
        "Evaluación Estado A (con errores)",
        resp_a, tin_a, tout_a,
    )

    resp_c, tin_c, tout_c = call_api("Estado C (solución correcta)", ESTADO_C)
    save_output(
        "02-output-estado-C.md",
        "Evaluación Estado C (solución correcta)",
        resp_c, tin_c, tout_c,
    )

    print(f"\n{'=' * 60}")
    print("Resumen")
    print(f"{'=' * 60}")
    print(f"Estado A: {tout_a} tokens de salida")
    print(f"Estado C: {tout_c} tokens de salida")
    print("\nArchivos generados:")
    print("  01-output-estado-A.md")
    print("  02-output-estado-C.md")


if __name__ == "__main__":
    main()
