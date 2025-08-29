function calcularEstadisticas(trafico) {
    // Calcular total de datos transferidos
    const totalDatos = Object.values(trafico).reduce((suma, valor) => suma + valor, 0);
    
    // Encontrar hora con mayor tráfico
    let horaMayorTrafico = "";
    let maxTrafico = 0;
    
    for (const [hora, trafico] of Object.entries(trafico)) {
        if (trafico > maxTrafico) {
            maxTrafico = trafico;
            horaMayorTrafico = hora;
        }
    }
    
    return {
        totalDatos,
        horaMayorTrafico,
        maxTrafico
    };
}

// Ejemplo de uso:
const estadisticas = calcularEstadisticas(traficoRed);