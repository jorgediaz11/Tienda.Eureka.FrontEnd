# Arquitectura Base - Tienda.Eureka.FrontEnd

## Principios

- Separacion por capas simples: estructura (HTML), presentacion (CSS), comportamiento (JS).
- Delegacion de eventos para reducir listeners y facilitar escalado.
- Componentizacion progresiva sin depender de framework.

## Capas del proyecto

1. Estructura
- index.html: unica entrada de la interfaz.

2. Estilos
- src/assets/styles/main.css: estilos base generados/existentes.
- src/assets/styles/components.css: capa modular legible para componentes y overrides.

3. Comportamiento
- src/assets/scripts/app.js: orquestador de eventos.
- src/assets/scripts/modules/carousel.js: desplazamiento de carruseles.
- src/assets/scripts/modules/cart.js: contador de carrito.
- src/assets/scripts/modules/quantity.js: control de cantidad.

4. Recursos
- src/assets/images/: imagenes optimizadas del catálogo.
- src/assets/images/originals/: respaldo de originales antes de compresion.

## Reglas de evolucion

- Todo comportamiento nuevo se agrega en modules y se conecta desde app.js.
- Evitar estilos inline; usar components.css para cambios funcionales del UI.
- Mantener nombres descriptivos y consistentes de recursos.
- Antes de editar imagenes, conservar respaldo en originals.

## Flujo recomendado para nuevas features

1. Definir marcado en index.html.
2. Estilar en components.css.
3. Implementar logica en un modulo nuevo.
4. Conectar modulo en app.js.
5. Validar accesibilidad minima: foco visible, type en botones, alt en imagenes.
