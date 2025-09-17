// Formatear fecha UTC a formato local legible
export const formatDate = (utcString) => {
    const date = new Date(utcString);
    return date.toLocaleString("es-AR", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };
  