✅ README.md — Sistema de Eventos Bancarios (Kafka + Next.js)
Sistema de Eventos Bancarios
Trabajo Práctico Final – Programación Avanzada

Autor: Santino Dacuy – UADER – 2025

📌 Introducción

Este proyecto implementa un sistema de transacciones bancarias en tiempo real, utilizando una arquitectura event-driven basada en Kafka.

Cuando un usuario inicia una transacción desde la aplicación web, el backend publica un evento en Kafka.
Un Orchestrator consume ese evento, ejecuta la lógica de negocio (reserva de fondos, detección de fraude, confirmación o reversión), y produce nuevos eventos que se transmiten en vivo al cliente mediante Server-Sent Events (SSE).

✅ Esto permite ver paso a paso la evolución de una transacción bancaria en tiempo real.

🎯 Objetivos del Proyecto

✔ Aplicar arquitectura de eventos
✔ Procesamiento distribuido con Kafka
✔ Comunicación asíncrona
✔ Streaming real-time hacia el navegador
✔ Orquestación de casos de negocio bancarios

🧩 Tecnologías utilizadas
Componente	Tecnología
Frontend	Next.js 16 + React + TailwindCSS
Mensajería / Streaming	Apache Kafka (modo standalone en Docker)
Backend Orquestación	Node.js + KafkaJS
Protocolos	REST + SSE
Infraestructura local	Docker Compose

🔄 Flujo de Eventos (Arquitectura)
flowchart LR
    A[Cliente Web] -->|POST /transactions| B(API Next.js)
    B -->|produce TransactionInitiated| C[Kafka topic: txn.commands]
    C -->|consume| D[Orchestrator]
    D -->|produce varios eventos| E[Kafka topic: txn.events]
    E -->|SSE real-time| A


🧪 Lógica de negocio simulada

El Orchestrator consume eventos de transacciones inicializadas y ejecuta una cadena de eventos que simula un flujo real de validación bancaria:

1. **Reserva de Fondos** – Verifica que la cuenta tenga saldo suficiente
2. **Análisis de Fraude** – Evalúa el riesgo basado en criterios ficticiospero realistas
3. **Commit/Reversión** – Confirma o rechaza la transacción según el análisis anterior
4. **Notificación** – Informa el estado final al cliente

El resultado se determina según una probabilidad de fraude controlada:

| Resultado | Condición |
|-----------|-----------|
| ✅ Committed | Riesgo bajo |
| ❌ Reversed | Riesgo alto / fondos insuficientes |

Esta simulación permite demostrar de forma clara cómo funciona el procesamiento distribuido de eventos en un entorno bancario.

🚀 Cómo ejecutar el proyecto

✅ 1️⃣ Instalar dependencias
npm install

✅ 2️⃣ Levantar Kafka con Docker

Desde la carpeta m

docker compose -f docker/docker-compose.yml up -d

Confirmar que Kafka está corriendo:

docker ps

Debe aparecer un container llamado kafka.

✅ 3️⃣ Ejecutar el Orchestrator (Kafka consumer/producer)
npm run orchestrator

Si todo está OK verás logs como:

Orchestrator ready. Waiting for commands…
[RECV] TransactionInitiated txn=...
[EMIT] FundsReserved …
[EMIT] FraudChecked …
...

✅ 4️⃣ Ejecutar la aplicación web

En otra terminal:

npm run dev

Abrir 👉 http://localhost:3005/

✅ Completar formulario
✅ Click en Iniciar transacción
✅ Timeline derecho se actualiza en tiempo real 🎯

📍Formulario izquierda – Nueva transacción
📍Timeline derecha – Eventos Kafka en streaming

📌 Colocar 2 o 3 capturas que ya tenés donde se muestra todo funcionando

✅ Conclusiones

✔ Se realizó con éxito una arquitectura distribuida real
✔ Comunicación event-driven mediante Kafka
✔ Streaming de actualizaciones con SSE sin necesidad de WebSockets
✔ UI intuitiva que permite observar los procesos bancarios en tiempo real
✔ Aprobación/reversión automática basada en análisis de fraude

✅ Autor

**Santino Dacuy**  
Licenciatura en Sistemas – Universidad Autónoma de Entre Ríos (UADER)  
Noviembre 2025

---

## Comandos rápidos (esta máquina)

- Instalar dependencias:

```bash
npm install
```

- Levantar Kafka (desde la carpeta `docker`):

```bash
docker compose -f docker/docker-compose.yml up -d
```

- Ejecutar el Orchestrator (consumidor/produtor Kafka):

```bash
npm run orchestrator
```

- Levantar el servidor de desarrollo Next.js (usa ahora el puerto 3005):

```bash
npm run dev
```

Notas rápidas:

- Las dependencias del proyecto están instaladas y listas para ejecutar.
- La compilación de Next.js se validó correctamente con `npm run build`.
- El puerto utilizado para la aplicación web es **3005** para evitar conflictos con otros servicios locales.
- Asegúrate de que Docker Desktop esté activo antes de ejecutar Kafka.
- Los logs del Orchestrator son útiles para diagnosticar el flujo de eventos en tiempo real.

