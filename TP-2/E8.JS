const alertasSeguridad = [
    { id: 1, tipo: "Intrusión", nivel: "alto", descripcion: "Intento de acceso no autorizado" },
    { id: 2, tipo: "Malware", nivel: "medio", descripcion: "Posible archivo malicioso detectado" },
    { id: 3, tipo: "DDoS", nivel: "alto", descripcion: "Ataque de denegación de servicio" },
    { id: 4, tipo: "Escaneo", nivel: "bajo", descripcion: "Escaneo de puertos detectado" }
];

const alertasAltas = alertasSeguridad
    .filter(alerta => alerta.nivel === "alto")
    .map(alerta => `ALERTA CRÍTICA: ${alerta.tipo} - ${alerta.descripcion}`);

console.log("Alertas de nivel alto:", alertasAltas);