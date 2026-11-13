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
- `costalia-plus.js`: motor activo de cálculo avanzado, búsqueda de productos e interacción.
- `api/products.js`: proxy serverless seguro para Google Shopping / SerpAPI, con búsqueda bajo demanda, filtrado de accesorios y caché temporal.
- `costalia-plus.css`: interfaz responsive y vista para impresión/PDF.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales multilingües.
- `favicon.svg`: identidad gráfica.

**Vercel:** importar este repositorio como proyecto independiente; Framework `Other`, Root Directory `./`, sin comando de compilación. Los cambios en `main` se desplegarán cuando la integración de Git esté configurada.

## Pendiente antes de comercializar

1. Completar la identidad y datos de contacto reales del titular en las páginas legales.
2. Comprobar la configuración real de alojamiento, logs, cookies y cualquier analítica externa.
3. Probar visualmente en móvil y escritorio tras el despliegue, y revisar accesibilidad.
4. Si se quieren precios reales por producto, integrar una fuente verificable con coste, límites y atribución adecuados.

## Activar la búsqueda real en Vercel

1. Abre Vercel → proyecto **Costalia** → **Settings → Environment Variables**.
2. Añade la variable **SERPAPI_KEY** con tu clave personal de SerpAPI (nunca en GitHub ni en el navegador).
3. Activa el entorno **Production** y los entornos de previsualización en los que quieras buscar.
4. En **Deployments**, vuelve a desplegar la versión más reciente.
5. Escribe «iPhone 16» en Costalia y pulsa **Buscar productos reales**. Las ofertas deberían incluir fuente y enlace, siempre que SerpAPI devuelva resultados compatibles.

Las consultas consumen la cuota de SerpAPI de la clave configurada. La búsqueda se realiza **solo al pulsar el botón**, no por cada tecla; usa caché de 15 minutos por instancia y un límite básico por IP. Para tráfico alto o evitar abuso será necesario implementar controles y cuotas persistentes adicionales.

No se usan fuentes externas para deducir consumo, reparaciones, seguro o valor futuro: estos datos se mantienen editables. La fuente de precios puede contener artículos similares, modelos distintos o costes de entrega incompletos. Cada resultado debe verificarse antes de usarlo y el usuario decide qué oferta seleccionar.

## Privacidad de búsqueda

Cuando se usa la búsqueda real, el texto introducido se envía al endpoint de Costalia y desde allí a SerpAPI para obtener ofertas. El proveedor de alojamiento y SerpAPI pueden tratar registros técnicos conforme a sus políticas. No introduzcas información personal sensible en el buscador. La política de privacidad debe reflejar este servicio.
