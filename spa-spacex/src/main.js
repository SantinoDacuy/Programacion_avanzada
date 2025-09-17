import "./assets/style.css";
import router from "./router.js";

// Punto de entrada de la aplicación
window.addEventListener("DOMContentLoaded", () => {
  router(window.location.hash);
});

// Detectar cambios en el hash para navegación SPA
window.addEventListener("hashchange", () => {
  router(window.location.hash);
});
