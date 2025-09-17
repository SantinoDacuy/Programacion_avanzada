const NotFound = () => {
  const container = document.createElement("div");
  container.classList.add("not-found");

  container.innerHTML = `
    <h2>404 - Página no encontrada</h2>
    <p>La ruta que buscas no existe.</p>
    <a href="#/home" class="btn-home">Volver al inicio</a>
  `;

  return container;
};

export default NotFound;
