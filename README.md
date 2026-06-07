# Tienda03 - Catalogo Educativo Eureka

Proyecto estatico en HTML/CSS/JS para mostrar catalogo de libros, plataformas y materiales educativos.

## Estructura

- index.html: pagina principal
- src/assets/styles/main.css: estilos base existentes
- src/assets/styles/components.css: estilos modulares legibles
- src/assets/scripts/app.js: punto de entrada JS
- src/assets/scripts/modules/: modulos por responsabilidad
- src/assets/images/: imagenes del catalogo
- src/assets/images/originals/: respaldo de imagenes antes de compresion

## Ejecutar en local

1. Abrir la carpeta del proyecto en VS Code.
2. Abrir index.html en el navegador.

Opcional (recomendado): usar la extension Live Server para recarga automatica.

## Buenas practicas aplicadas

- Estructura semantica base (header, nav, main, footer)
- Botones con type="button"
- Foco visible para teclado
- Nombres de imagenes consistentes (libro-0001.jpg ...)
- Script separado en archivo externo y modularizado
- Carga diferida de imagenes fuera del hero (loading="lazy")
- Dimensiones width/height en todas las imagenes para reducir CLS
- Optimizacion de imagenes JPG con respaldo de originales

## Documentacion de arquitectura

- Ver detalle en ARCHITECTURE.md
