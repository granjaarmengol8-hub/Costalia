# Costalia

Web independent de Prezio, sense backend ni APIs de pagament. Calcula el cost real de tenir un vehicle durant 3, 5 o 10 anys.

## Funcions
- Comparació de dos vehicles amb cost de compra, quilòmetres, consum, energia, assegurança, manteniment, impostos, aparcament, reparacions i pèrdua de valor.
- Gasolina, dièsel i elèctric amb unitats adequades.
- Préstec amb interessos meritats durant l'horitzó analitzat.
- Escenaris optimista (-15%), normal i pessimista (+20%) aplicats als costos d'energia, manteniment, reparacions i taxa anual de depreciació.
- Taula d'evolució acumulada per anys, resum copiable i enllaç per compartir la simulació.
- Castellà, català i anglès. Disseny responsive.
- Tots els valors són exemples editables. Cap dada de mercat simulada com a real.

## Publicació a Vercel
Importa **granjaarmengol8-hub/Costalia** com un projecte nou. Framework: Other. Root Directory: `./`. L'entrada principal és `index.html`. No cal Build Command.

## Model de càlcul
Cost econòmic acumulat = depreciació acumulada + costos d'ús acumulats + interessos meritats dins del període. El valor residual es calcula com `preu*(1-taxa_depreciació)^anys`. El finançament segueix quotes constants (sistema francès). El capital de compra no se suma dues vegades. El pagament mensual habitual s'expressa mentre la quota és activa i es redueix en acabar el préstec.

## Limitacions
No inclou inflació, costos d'oportunitat, avaries extraordinàries o preus verificats en directe. Els escenaris són regles genèriques, no prediccions. Comprova sempre les estimacions abans de decidir una compra.

## Idees següents
Perfil de vehicle real per matrícula o model amb fonts contrastades, finançament variable, pressupost familiar, informes PDF, comparació de costos anuals no constants, vehicles híbrids i motos.
