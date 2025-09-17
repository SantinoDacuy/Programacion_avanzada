const API_URL = "https://api.spacexdata.com/v5/launches";

// Obtener todos los lanzamientos
export const getLaunches = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("getLaunches failed:", error);
    throw error;
  }
};

// Obtener un lanzamiento por ID
export const getLaunchById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("getLaunchById failed:", error);
    throw error;
  }
};
