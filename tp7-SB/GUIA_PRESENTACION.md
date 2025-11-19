# 🎯 Guía para Presentación del Proyecto

## Sistema de Eventos Bancarios con Kafka + Next.js

---

## ⚡ Inicio Rápido (5 minutos)

### Paso 1️⃣: Levantar Kafka (Docker)
```bash
docker compose -f docker/docker-compose.yml up -d
```
**✓ Espera ~15-20 segundos** hasta que Kafka esté listo.

Verifica que el contenedor esté corriendo:
```bash
docker ps
```
Deberías ver un container llamado `kafka` en estado `Up`.

---

### Paso 2️⃣: Abrir 2 terminales

#### Terminal 1: Ejecutar el Orchestrator
```bash
npm run orchestrator
```
**Espera a ver este mensaje:**
```
Orchestrator ready. Waiting for commands…
```

---

#### Terminal 2: Ejecutar la Aplicación Web
```bash
npm run dev
```
**Espera a ver:**
```
✓ Ready in 3.3s
```

---

### Paso 3️⃣: Abrir en el Navegador
Accede a: **http://localhost:3005**

---

## 🎬 Demo en Vivo

Una vez que todo está corriendo:

1. **Completa el formulario** (valores por defecto están OK):
   - Usuario: `u1`
   - Moneda: `ARS`
   - Desde: `AR-123`
   - Hacia: `AR-987`
   - Monto: `1000`

2. **Haz click en "Iniciar transacción"**

3. **Observa el timeline** (lado derecho):
   - ✅ `TransactionInitiated` - Transacción iniciada
   - ✅ `FundsReserved` - Fondos reservados
   - ✅ `FraudChecked` - Análisis de fraude (LOW/HIGH)
   - ✅ `Committed` o `Reversed` - Confirmación o reversión
   - ✅ `Notified` - Notificación enviada

4. **Puedes crear múltiples transacciones** - cada una aparece con su propia timeline en tiempo real.

---

## 🔍 ¿Qué está pasando?

```
FLUJO DE EVENTOS:
┌──────────────────┐
│  Cliente Web     │
│  (Formulario)    │
└────────┬─────────┘
         │ POST /api/transactions
         ▼
┌──────────────────┐
│  Kafka Topic:    │
│  txn.commands    │
└────────┬─────────┘
         │ consume
         ▼
┌──────────────────┐
│  Orchestrator    │ (Simula lógica bancaria)
│  (Node.js)       │ • Reserva fondos
└────────┬─────────┘ • Analiza fraude
         │ produce eventos
         ▼
┌──────────────────┐
│  Kafka Topic:    │
│  txn.events      │
└────────┬─────────┘
         │ SSE real-time
         ▼
┌──────────────────┐
│  Timeline        │
│  (navegador)     │
└──────────────────┘
```

---

## 📊 Estadísticas de Fraude

El Orchestrator decide aleatoriamente:
- **80% de probabilidad**: Transacción **APROBADA** (Committed)
- **20% de probabilidad**: Transacción **RECHAZADA** (Reversed - FRAUD_RISK)

---

## ⚠️ Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| ❌ Kafka no conecta | Verifica `docker ps` y que el container `kafka` esté `Up` |
| ❌ Orchestrator no inicia | Kafka debe estar corriendo primero |
| ❌ El navegador no muestra nada | Espera 3-5 segundos después de `npm run dev`, recarga la página |
| ❌ Timeline vacío | Verifica que el Orchestrator esté corriendo en la otra terminal |

---

## 🛑 Para Detener Todo

```bash
# Terminal 1 y 2: Presiona Ctrl+C en cada una

# Detener Kafka:
docker compose -f docker/docker-compose.yml down
```

---

## 💡 Tips para la Presentación

✅ Tener **DOS terminales visibles** lado a lado:
   - Izquierda: Orchestrator logs
   - Derecha: Next.js server

✅ Tener el **navegador en pantalla** mostrando http://localhost:3005

✅ Hacer **3-4 transacciones diferentes** para demostrar:
   - Flujo rápido de eventos
   - Mix de aprobaciones y rechazos
   - SSE en tiempo real funcionando

✅ Opcionalmente mostrar logs del **Orchestrator**:
   - `[RECV] TransactionInitiated`
   - `[EMIT] FundsReserved / FraudChecked / Committed / Notified`

---

## 🎯 Duración Esperada

- **Setup**: 1-2 minutos (Docker + terminales)
- **Demo**: 3-5 minutos (múltiples transacciones)
- **Total**: ~5-7 minutos

---

**¡Listo para presentar!** 🚀
