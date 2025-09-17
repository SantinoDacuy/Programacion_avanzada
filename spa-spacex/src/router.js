import Home from "./pages/home.js";
import Detail from "./pages/detail.js";
import NotFound from "./pages/not-found.js";

// Router simple con hash (#/home, #/detail/:id)
const router = (route) => {
  const app = document.getElementById("app");
  app.innerHTML = ""; // limpiar

  if (!route || route === "#/" || route === "#/home") {
    app.appendChild(Home());
  } else if (route.startsWith("#/detail/")) {
    const id = route.split("/")[2];
    app.appendChild(Detail(id));
  } else {
    app.appendChild(NotFound());
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default router;
