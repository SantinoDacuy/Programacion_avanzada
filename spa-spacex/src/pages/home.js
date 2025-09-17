import { getLaunches } from "../utils/api.js";

const Home = () => {
  const container = document.createElement("div");
  container.classList.add("grid");

  const status = document.createElement("div");
  status.classList.add("status");
  status.textContent = "Cargando lanzamientos...";
  container.appendChild(status);

  getLaunches()
    .then((launches) => {
      container.removeChild(status);

      if (!Array.isArray(launches) || launches.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("status");
        empty.textContent = "No se encontraron lanzamientos.";
        container.appendChild(empty);
        return;
      }

      launches.forEach((launch) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imageSrc = launch?.links?.patch?.small || "";
        const safeAlt = launch?.name || "Lanzamiento SpaceX";

        card.innerHTML = `
          <h3>${safeAlt}</h3>
          <img loading="lazy" src="${imageSrc}" alt="${safeAlt}" />
        `;

        card.addEventListener("click", () => {
          window.location.hash = `#/detail/${launch.id}`;
        });

        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML = "";
      const errorBox = document.createElement("div");
      errorBox.classList.add("status", "error");
      errorBox.textContent = "Ocurrió un error al cargar los lanzamientos.";
      container.appendChild(errorBox);
    });

  return container;
};

export default Home;
