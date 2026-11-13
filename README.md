# Costalia — ¿Cuánto te cuesta de verdad?

Comparador de **coste total de propiedad y uso**. Proyecto completamente independiente de Prezio.

## Categorías
- Coche (motor gasolina, diésel y eléctrico), moto, bicicleta y patinete eléctrico
- Compra de vivienda y alquiler
- Electrodomésticos
- Móviles, tabletas y ordenadores
- Maquinaria y herramientas
- Paneles solares
- Suscripciones y servicios
- Cualquier otra compra en modo personalizado

## Funciones
- Comparar dos alternativas a 3, 5 y 10 años.
- Compra o desembolso inicial, valor final de reventa, gastos recurrentes, gastos únicos, por uso, financiación e intereses.
- Añadir y quitar partidas de gasto personalizadas.
- Escenarios optimista, normal y pesimista; regla aproximada de -15% / +20% sobre costes recurrentes variables.
- Resultados comparativos, costes totales y mensuales y enlace para compartir.
- Idiomas español (predeterminado), catalán e inglés.
- Para coches: evolución anual, depreciación porcentual y comparación de consumos. La calculadora general admite valores de reventa introducidos manualmente.

## Precauciones
Todos los valores predefinidos son **ejemplos editables**, no datos verificados del mercado. La cobertura de categorías no significa que se obtengan precios reales ni que se modelen todas las reglas particulares de cada producto. El usuario debe verificar las estimaciones antes de tomar decisiones.
En modo general, el valor de reventa es una estimación al final del horizonte elegido, y se asume igual al cambiar los años salvo que el usuario lo actualice. Las suscripciones se modelan como gasto recurrente sin valor de reventa. El finançament és una aproximació de quota constant i interessos meritats.

## Despliegue
Importar el repositorio `granjaarmengol8-hub/Costalia` en Vercel como proyecto nuevo y separado. Framework Preset: Other; Root Directory: `./`; sin comando de compilación. Publicar `index.html` como página estática.
