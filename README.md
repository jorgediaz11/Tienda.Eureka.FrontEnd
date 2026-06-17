# Tienda.Eureka.FrontEnd - React + Vite

Proyecto migrado a React + Vite para catalogo educativo y flujos dinamicos.

## Estructura principal

- index.html: entrada unica de Vite
- src/main.jsx: arranque de React
- src/react/App.jsx: enrutado principal
- src/react/pages/: paginas en espanol
- src/react/context/: estado global
- src/react/services/: capa de servicios
- src/react/api/: cliente HTTP, endpoints y contratos

## HTML legacy

Los archivos HTML de paginas antiguas fueron retirados. Solo se usa index.html como punto de entrada.

## Ejecucion

1. npm install
2. npm run dev
3. npm run build

## Variables de entorno (.env)

Este proyecto usa Vite, por lo tanto solo las variables con prefijo `VITE_` estan disponibles en el frontend.

1. Copia `.env.example` a `.env`.
2. Ajusta los valores segun tu entorno.

Variables incluidas:

- `VITE_APP_VERSION`: version visible de la app.
- `VITE_CONTACT_EMAIL`: correo destino del formulario de contacto.
- `VITE_API_BASE_URL`: URL base del backend.
- `VITE_USE_MOCK`: habilita/deshabilita respuestas mock.

Importante:

- No guardes credenciales reales de base de datos en el frontend.
- Usuario, password, host y cadena de conexion de BD deben vivir en el backend (API/servidor), no en este proyecto React.

### Plantilla backend

Se agrego `.env.backend.example` para variables de API/servidor (DB, JWT, SMTP, throttling).

- Este archivo es referencial para tu backend.
- No reutilices secretos reales en archivos versionados.
