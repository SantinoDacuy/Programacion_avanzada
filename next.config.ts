/**
 * ⚙️ NEXT.CONFIG.TS - EL "PANEL DE CONTROL" DE NEXT.JS
 * 
 * ¿QUÉ HACE?
 * - Configura cómo funciona Next.js
 * - Define opciones del framework
 * - Controla el comportamiento de compilación
 * 
 * EN ESTE PROYECTO SOLO TIENE:
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,// 🚀 Habilita Turbopack (compilación más rápida)
  },
};

export default nextConfig;
/**
 * 🎯 OPCIONES QUE PODRÍA TENER (pero este proyecto no usa):
 * - Redirects, rewrites → Redirecciones de URLs
 * - Headers → Cabeceras HTTP
 * - Environment variables → Variables de entorno
 * - Output compression → Compresión de archivos
 * - Y muchas más...
 */