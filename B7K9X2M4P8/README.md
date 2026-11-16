# PETLINK · Plantilla estática

## Personalización
Edita **pet-data.js**. Es el archivo de datos: cambia nombre, foto, raza, edad, sexo, mensajes, cuidados y WhatsApp. No necesitas tocar index.html ni app.js.

- `photo`: URL pública de la fotografía.
- `care`: arreglo de tarjetas; cada objeto tiene `icon`, `title`, `text` y `type` opcional (`warning`).
- `whatsapp`: teléfono con código de país, solo dígitos (México: 52 + número).
- `lost`: usa `true` para mostrar estado de mascota extraviada.

## Publicación
Es una web estática. Sube juntos `index.html`, `styles.css`, `app.js` y `pet-data.js` a cualquier hosting estático o hosting compartido. No requiere PHP, MySQL ni base de datos.

Puedes duplicar la carpeta por mascota y editar solo `pet-data.js`. La geolocalización necesita HTTPS (o localhost) y permiso del visitante. No publiques domicilios ni datos privados.

Las fuentes y los iconos usan CDN; requieren internet. Las animaciones respetan la preferencia de movimiento reducido del dispositivo.
