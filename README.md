# Costalia — descubre cuánto te cuesta de verdad

**Web independiente de Prezio.** Calculadora orientativa del coste total de compra, propiedad y uso de productos, servicios y vehículos. No requiere registro ni API de pago.

## Nuevas funciones

- **Búsqueda orientativa por texto:** reconoce palabras como `iPhone 16`, `BMW Serie 3`, `lavadora`, `tractor`, etc., y sugiere la categoría y un formulario editable. **No es un catálogo ni recupera precios reales de productos.** El precio del artículo nombrado queda sin rellenar y se exige introducirlo para calcular.
- **Dos modos:** rápido (preguntas esenciales) y avanzado (financiación, consumo, valor residual, uso y todos los gastos). En el rápido se siguen aplicando las hipótesis ocultas, y se avisa expresamente.
- **Comparación de 1 a 4 opciones** y total económico por alternativa.
- **Gráficos** de composición del coste y evolución anual de las opciones, con tabla anual.
- **Punto de cambio** de la opción más económica por año, según supuestos introducidos.
- **Calculadora de presupuesto:** ingresos netos, gastos fijos, margen deseado y desembolso mensual habitual. Es indicativa y no evalúa solvencia crediticia.
- **Informe PDF:** opción de impresión del navegador, con posibilidad de escoger «Guardar como PDF».
- **Simulaciones guardadas localmente** en `localStorage`, con nombre y opción de borrar; sin cuenta ni sincronización.
- **Enlace compartible** con hipótesis de comparación. Los datos del presupuesto **se excluyen** del enlace.
- **Tarjeta PNG** de los resultados para compartir.
- **Tres idiomas** en la calculadora, guía de uso, glosario y páginas legales: español (predeterminado), catalán e inglés.

## Categorías

Coches, motos, bicicletas, patinetes eléctricos, compra y alquiler de vivienda, electrodomésticos, móviles y tabletas, ordenadores, maquinaria, paneles solares, suscripciones y opción personalizable. Cada categoría incluye conceptos de gasto de ejemplo editables. Los vehículos motorizados incluyen consumo y energía. En paneles solares, el simulador actual refleja costes pero **no modela ahorros de autoconsumo ni incentivos**.

## Cómo funciona la estimación

- **Coste económico** = pérdida de valor estimada + gastos únicos y recurrentes + energía + intereses devengados durante el horizonte.
- Vehículos y otros bienes: depreciación anual porcentual compuesta. Vivienda: valor final introducido por el usuario. Alquiler y suscripciones: sin valor de reventa.
- Préstamos: amortización de cuota constante con interés nominal (TIN), sin comisiones ni TAE. La cuota se añade únicamente al **desembolso mensual habitual**, no al coste económico (para no duplicar capital).
- Escenarios: variación orientativa de gastos recurrentes variables y tasa de depreciación en -15% / 0% / +20%.
- Los valores iniciales son **ejemplos ilustrativos**, no ofertas ni datos de mercado. No incluye inflación ni todas las particularidades legales, fiscales o energéticas. Es imprescindible revisar supuestos antes de decidir.

## Estructura y publicación

- `index.html`: portada, guía, glosario y soporte de idioma; contiene la calculadora original oculta como respaldo, no se presenta al visitante.
- `costalia-plus.js`: motor activo de cálculo avanzado e interacción.
- `costalia-plus.css`: interfaz responsive y vista para impresión/PDF.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales multilingües.
- `favicon.svg`: identidad gráfica.

**Vercel:** importar este repositorio como proyecto independiente; Framework `Other`, Root Directory `./`, sin comando de compilación. Los cambios en `main` se desplegarán cuando la integración de Git esté configurada.

## Pendiente antes de comercializar

1. Completar la identidad y datos de contacto reales del titular en las páginas legales.
2. Comprobar la configuración real de alojamiento, logs, cookies y cualquier analítica externa.
3. Probar visualmente en móvil y escritorio tras el despliegue, y revisar accesibilidad.
4. Si se quieren precios reales por producto, integrar una fuente verificable con coste, límites y atribución adecuados.
