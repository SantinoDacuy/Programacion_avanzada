const informeActividad = conexionesActivas.map(conexion => {
    const dispositivoOrigen = dispositivos.find(d => d.ip === conexion.origen);
    const dispositivoDestino = dispositivos.find(d => d.ip === conexion.destino);
    
    return {
        origen: dispositivoOrigen ? dispositivoOrigen.nombre : conexion.origen,
        destino: dispositivoDestino ? dispositivoDestino.nombre : conexion.destino,
        protocolo: conexion.protocolo,
        bytes: conexion.bytes,
        tipoOrigen: dispositivoOrigen ? dispositivoOrigen.tipo : "Desconocido",
        tipoDestino: dispositivoDestino ? dispositivoDestino.tipo : "Desconocido"
    };
});

console.log("Informe de actividad de red:", informeActividad);