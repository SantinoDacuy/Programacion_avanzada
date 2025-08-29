function filtrarYOrdenarPaquetes(paquetes) {
    return paquetes
        .filter(paquete => paquete.tamaño > 1000)
        .sort((a, b) => b.prioridad - a.prioridad);
}

// Ejemplo de uso:
const paquetesFiltrados = filtrarYOrdenarPaquetes(paquetesDatos);