// Contar conexiones por nodo
topologiaRed.conexiones.forEach(conexion => {
    conexionesPorNodo[conexion.origen]++;
    conexionesPorNodo[conexion.destino]++;
});

// Ordenar nodos por número de conexiones
const nodosOrdenados = Object.entries(conexionesPorNodo)
    .sort((a, b) => b[1] - a[1]);

// Sugerir optimizaciones
const sugerencias = [];
nodosOrdenados.forEach(([nodoId, conexiones]) => {
    if (conexiones > 2) {
        const nodo = topologiaRed.nodos.find(n => n.id === nodoId);
        sugerencias.push(`El nodo ${nodoId} (${nodo.tipo}) tiene ${conexiones} conexiones y podría necesitar más ancho de banda`);
    }
});

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por número de conexiones:", nodosOrdenados);
console.log("Sugerencias de optimización:", sugerencias);