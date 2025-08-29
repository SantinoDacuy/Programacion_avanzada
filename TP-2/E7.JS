const conexionesPorProtocolo = {};

conexiones.forEach(conexion => {
    if (conexionesPorProtocolo[conexion.protocolo]) {
        conexionesPorProtocolo[conexion.protocolo]++;
    } else {
        conexionesPorProtocolo[conexion.protocolo] = 1;
    }
});

console.log("Conexiones por protocolo:", conexionesPorProtocolo);