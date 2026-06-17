# Checklist Basico HTML - Marcacion Actual

Estado del proyecto evaluado sobre index.html y estructura actual.

## 01. Estructura del Proyecto

- [x] 01.1 Existe pagina principal en raiz: index.html.
- [x] 01.2 Existe README con instrucciones basicas de uso.
- [x] 01.3 Existe .gitignore para archivos temporales/editor.
- [x] 01.4 Assets separados por tipo en carpeta src/assets.
- [x] 01.5 Nombres de imagenes consistentes (libro-0001.jpg ...).

## 02. Base HTML

- [x] 02.1 DOCTYPE declarado.
- [x] 02.2 Idioma definido en html lang="es".
- [x] 02.3 Meta charset presente.
- [x] 02.4 Meta viewport presente.
- [x] 02.5 Meta description presente.
- [x] 02.6 Titulo de pagina representativo del negocio/producto.

## 03. Semantica y Jerarquia

- [x] 03.1 Existe header.
- [x] 03.2 Existe nav.
- [x] 03.3 Existe main envolviendo el contenido principal.
- [x] 03.4 Existe footer.
- [x] 03.5 Solo un h1 por pagina.

## 04. Accesibilidad Basica

- [x] 04.1 Todas las imagenes tienen atributo alt.
- [x] 04.2 Los botones incluyen type="button" cuando no envian formulario.
- [x] 04.3 Se verifica foco visible para navegacion con teclado.
- [x] 04.4 Se valida contraste de color en textos y botones.

## 05. CSS y Mantenibilidad

- [x] 05.1 Existe hoja de estilos externa.
- [x] 05.2 Se minimiza estilo inline (reducido de 259 a 10 style="...").
- [x] 05.3 Estilos reutilizables en clases para evitar repeticion.
- [x] 05.4 Hoja CSS legible/modular (evitar archivo compilado dificil de mantener).

## 06. Imagenes y Rendimiento

- [x] 06.1 Imagenes con extension correcta (.jpg).
- [x] 06.2 Uso de loading="lazy" en imagenes fuera del primer viewport.
- [x] 06.3 Definir width y height en imagenes para reducir saltos visuales.
- [x] 06.4 Comprimir/optimizar imagenes para web.

## 07. JavaScript Basico

- [x] 07.1 Script funcional para interacciones principales.
- [x] 07.2 Script externo separado (en lugar de bloque inline grande en HTML).
- [x] 07.3 Evitar selectores fragiles basados en estilos inline en JS.

## 08. Resultado General

- Cumplidos: 31
- Pendientes: 0
- Nivel actual: Base funcional solida, con checklist tecnico basico completo.

## 09. Prioridad Recomendada (orden de mejora)

1. Agregar main y corregir jerarquia a un solo h1. [completado]
2. Reducir estilos inline moviendo bloques repetidos a CSS. [completado]
3. Mejorar accesibilidad de botones/foco/contraste. [completado]
4. Aplicar lazy loading y dimensiones a imagenes. [completado]
5. Crear README y .gitignore para orden de proyecto. [completado]
