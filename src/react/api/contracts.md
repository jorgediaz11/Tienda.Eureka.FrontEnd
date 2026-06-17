# Contratos de Integracion Pendientes (Frontend -> Endpoints)

## 01. Autenticacion

### 01.1 POST /api/auth/login
Request:
```json
{
  "email": "usuario@correo.com",
  "password": "string",
  "fullName": "string opcional",
  "phone": "string opcional"
}
```
Response:
```json
{
  "token": "jwt-or-session-token",
  "user": {
    "email": "usuario@correo.com",
    "fullName": "Nombre Usuario",
    "phone": "999999999"
  }
}
```

### 01.2 PUT /api/auth/profile
Headers: Authorization Bearer token
Request:
```json
{
  "fullName": "Nombre Actualizado",
  "phone": "999999999"
}
```
Response:
```json
{
  "user": {
    "fullName": "Nombre Actualizado",
    "phone": "999999999"
  }
}
```

### 01.3 POST /api/auth/logout
Headers: Authorization Bearer token
Response:
```json
{ "ok": true }
```

## 02. Contacto

### 02.1 POST /api/contact/send
Headers: Authorization opcional
Request:
```json
{
  "to": "contacto@eureka.pe",
  "from": "usuario@correo.com",
  "subject": "[Web] Consulta general",
  "body": "Texto completo del mensaje"
}
```
Response:
```json
{
  "accepted": true,
  "messageId": "provider-message-id"
}
```

## 03. Como Comprar (tabla de reglas)

### 03.1 GET /api/guides/how-to-buy
Response:
```json
[
  {
    "key": "plan-lector",
    "title": "Plan lector",
    "description": "Descripcion",
    "productIds": ["libro-0011", "libro-0006"]
  }
]
```

Notas:
- productIds debe mapear con ids del catalogo disponible en frontend/backoffice.
- Si el endpoint falla, el frontend usa tabla local fallback.

## 04. Servicio al cliente

### 04.1 GET /api/support/topics
Response:
```json
[
  {
    "id": "order-status",
    "title": "Estado de pedido",
    "description": "Consulta estado del pedido",
    "channel": "Pedidos"
  }
]
```

### 04.2 POST /api/support/tickets
Headers: Authorization opcional
Request:
```json
{
  "topicId": "order-status",
  "topicTitle": "Estado de pedido",
  "detail": "Detalle del caso",
  "customer": {
    "email": "cliente@correo.com",
    "name": "Cliente"
  }
}
```
Response:
```json
{
  "ticketId": "TCK-12345",
  "status": "created"
}
```

## 05. Checkout (ver carrito)

### 05.1 POST /api/checkout/create
Headers: Authorization opcional
Request:
```json
{
  "amount": 120.5,
  "items": [
    {
      "id": "libro-0011",
      "title": "Cien Anos de Soledad",
      "price": 24.99,
      "quantity": 2
    }
  ],
  "customer": {
    "email": "cliente@correo.com",
    "name": "Cliente"
  }
}
```
Response:
```json
{
  "orderId": "ORD-12345",
  "paymentStatus": "approved",
  "amount": 120.5,
  "items": []
}
```
