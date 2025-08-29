function obtenerDireccionesIP(servidores) {
    return servidores.map(servidor => servidor.ip);
}

// Ejemplo de uso:
const direccionesIP = obtenerDireccionesIP(servidores);