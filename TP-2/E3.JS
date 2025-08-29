function filtrarPorMarca(dispositivos, marca) {
    return dispositivos.filter(dispositivo => dispositivo.marca === marca);
}

// Ejemplo de uso:
const dispositivosCisco = filtrarPorMarca(dispositivosRed, "Cisco");
const dispositivosTPL = filtrarPorMarca(dispositivosRed, "TP-Link");