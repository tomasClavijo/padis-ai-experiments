# Rúbrica de evaluación — POO Vehículos

Rúbrica de 13 criterios diseñada a partir de la consigna del ejercicio 01 (POO Vehículos, C# / .NET 10). Cada criterio es verificable mediante lectura estática del código, sin necesidad de ejecución.

## Criterios

| #  | Criterio | Categoría |
|----|----------|-----------|
| 1  | Existen dos proyectos separados: consola + librería de clases (Dominio) | Estructura |
| 2  | La referencia entre proyectos está configurada correctamente | Estructura |
| 3  | La clase base `Vehiculo` tiene las propiedades `cantidadPuertas` (int) y `colorChasis` (string) | Modelado |
| 4  | `Encender()` en `Vehiculo` no tiene comportamiento (cuerpo vacío o abstract) | Herencia |
| 5  | `Encender()` en `Vehiculo` está marcado como `virtual` o `abstract` | Polimorfismo |
| 6  | `Auto` y `Camioneta` heredan de `Vehiculo` | Herencia |
| 7  | Los constructores de `Auto` y `Camioneta` delegan al constructor base | Herencia |
| 8  | `Auto` y `Camioneta` usan `override` (no `new`, no sobrecarga) para redefinir `Encender()` | Polimorfismo |
| 9  | La firma de `Encender()` es idéntica en la base y en las hijas | Polimorfismo |
| 10 | Los mensajes impresos coinciden con la especificación de la consigna | Funcionalidad |
| 11 | Se usa `List<Vehiculo>` para almacenar los objetos | Polimorfismo |
| 12 | El recorrido es polimórfico: se llama a `Encender()` sin preguntar el tipo | Polimorfismo |
| 13 | No hay lógica por tipo (`is`, `as`, `typeof`, `GetType`) para decidir comportamiento | Polimorfismo |

## Formato de texto pasado al modelo

```
1. Existen dos proyectos separados: consola + librería de clases (Dominio)
2. La referencia entre proyectos está configurada correctamente
3. La clase base Vehiculo tiene las propiedades cantidadPuertas (int) y colorChasis (string)
4. Encender() en Vehiculo no tiene comportamiento (cuerpo vacío o abstract)
5. Encender() en Vehiculo está marcado como virtual o abstract
6. Auto y Camioneta heredan de Vehiculo
7. Los constructores de Auto y Camioneta delegan al constructor base
8. Auto y Camioneta usan override (no new, no sobrecarga) para redefinir Encender()
9. La firma de Encender() es idéntica en la base y en las hijas
10. Los mensajes impresos coinciden con la especificación de la consigna
11. Se usa List<Vehiculo> para almacenar los objetos
12. El recorrido es polimórfico: se llama a Encender() sin preguntar el tipo
13. No hay lógica por tipo (is, as, typeof, GetType) para decidir comportamiento
```

## Notas de diseño

- Los criterios cubren tres dimensiones: **estructura del proyecto**, **modelado de clases** y **uso de polimorfismo**.
- Se priorizaron criterios binarios (cumple/no cumple) para minimizar la ambigüedad en la evaluación del modelo.
- No se incluyen criterios de estilo o convención (como PascalCase) para evitar falsos positivos por diferencias de convención, aunque la consigna original los menciona.
