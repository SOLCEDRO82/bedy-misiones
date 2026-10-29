# Selector de camas: "Doble" y "Simple" + capacidad en personas

## Opinión UX
Buena idea. La industria (Booking, Airbnb) muestra el tipo de cama en la ficha ("1 cama doble · 2 simples") y la capacidad aparte ("hasta 4 huéspedes"). Mostrar las personas justo debajo de las camas, igual que las noches debajo de las fechas, le da al usuario las dos cosas al mismo tiempo sin perder lo distinto de bedy.

## Cambios
1. **Etiquetas:** "Matrimonial" pasa a **Doble** y "Individual" pasa a **Simple**, con una aclaración chica debajo de cada una: "2 personas" y "1 persona".
2. **Resumen debajo de los contadores**, con el mismo estilo violeta que las noches:
   "Hasta 3 personas · 1 doble + 1 simple"
   - Fórmula: dobles × 2 + simples × 1.
   - Si no hay ninguna cama elegida: "Elegí al menos una cama" en gris, y el botón Buscar queda desactivado.
3. **Límite** de 9 camas por tipo (se mantiene el actual).
4. **Mismos nombres en el resto del sitio:** las tarjetas de los carruseles y el detalle de cada hospedaje dicen "1 doble · 2 simples · hasta 4 personas".

## Ideas extra (opcionales, para más adelante)
- Un ícono de personas al lado del número, para que se lea de un vistazo.
- Atajos rápidos tipo "Pareja", "Familia", "Amigos" que completan las camas solos.

## Detalles técnicos
- La cuenta de personas se hace en un solo lugar, en el archivo de datos (`capacity(doble, simple)`), y la usan el buscador, las tarjetas y el detalle.
- Agrego una prueba para la regla: 1 doble + 1 simple = 3 personas, y 0 + 0 = 0.
