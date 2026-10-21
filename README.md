# Mueblería El Retablo — sitio web

Sitio estático (HTML, CSS y JS). Para verlo, abre `index.html` en el navegador.

## Fotos

Las fotos se colocan en la carpeta `img/` con **estos nombres exactos**. Mientras una foto no exista, el sitio muestra un aviso "📷 FOTO: …" en su lugar.

| Archivo | Qué foto va |
|---|---|
| `img/portada.jpg` | Portada: vista general del local o taller (horizontal, grande) |
| `img/familia.jpg` | La familia / fundadores en el taller (vertical) |
| `img/manos.jpg` | Detalle de manos trabajando la madera (cuadrada) |
| `img/taller-1.jpg` | Madera en bruto / almacén |
| `img/taller-2.jpg` | Taller trabajando |
| `img/taller-3.jpg` | Aplicando acabado |
| `img/fachada.jpg` | Fachada del local |
| `img/catalogo/*.jpg` | Muebles del catálogo (nombres en `js/main.js`, lista `PRODUCTOS`) |

### Cómo subir fotos desde GitHub (sin instalar nada)

1. Entra a https://github.com/CUANTEK/Retablo y abre la carpeta `img` (o `img/catalogo`).
2. Clic en **Add file → Upload files**.
3. Arrastra las fotos desde Descargas (renómbralas antes con los nombres de la tabla).
4. Clic en **Commit changes**.

## Pendientes

- **Logo**: reemplazar el bloque marcado `LOGO` en `index.html`.
- **Correo**: escribirlo en `data-correo=""` en `index.html` (mientras esté vacío no se muestra).
- **Video de dron**: guardar como `img/dron.mp4` y seguir el comentario `VIDEO DRON` en `index.html`.

## Catálogo

Se edita en `js/main.js`, en la lista `PRODUCTOS` (nombre, categoría, foto y descripción). Las categorías de los filtros se generan solas.

## Publicar gratis (GitHub Pages)

En el repo: **Settings → Pages → Branch: main / root → Save**. El sitio quedará en `https://cuantek.github.io/Retablo/`.
