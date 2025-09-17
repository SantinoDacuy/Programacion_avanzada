import { getLaunchById } from "../utils/api.js";
import { formatDate } from "../utils/helpers.js";

const Detail = (id) => {
  const container = document.createElement("div");
  container.classList.add("detail");

  const status = document.createElement("div");
  status.classList.add("status");
  status.textContent = "Cargando detalle...";
  container.appendChild(status);

  getLaunchById(id)
    .then((launch) => {
      container.removeChild(status);

      const name = launch?.name || "Lanzamiento SpaceX";
      const imageSrc = launch?.links?.patch?.small || "";
      const flightNumber = launch?.flight_number ?? "-";
      const dateUtc = launch?.date_utc ? formatDate(launch.date_utc) : "-";
      const details = launch?.details || "Sin detalles";
      const failures = Array.isArray(launch?.failures) ? launch.failures : [];
      const failuresText = failures.length > 0
        ? failures.map((f) => f?.reason).filter(Boolean).join(", ")
        : "Ninguna";

      container.innerHTML = `
        <h2>${name}</h2>
        <img loading="lazy" src="${imageSrc}" alt="${name}" />
        <p><strong>Número de vuelo:</strong> ${flightNumber}</p>
        <p><strong>Fecha de despegue:</strong> ${dateUtc}</p>
        <p><strong>Detalles:</strong> ${details}</p>
        <p><strong>Fallas:</strong> ${failuresText}</p>
      `;
    })
    .catch(() => {
      container.innerHTML = "";
      const errorBox = document.createElement("div");
      errorBox.classList.add("status", "error");
      errorBox.textContent = "Ocurrió un error al cargar el detalle.";
      container.appendChild(errorBox);
    });

  return container;
};

export default Detail;
