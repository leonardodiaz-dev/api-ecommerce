export const parsearVariantes = (variantes: string) => {
  if (!variantes) return [];

  try {
    return JSON.parse(variantes);
  } catch (err) {
    console.error("Error al parsear variantes:", err);
    throw new Error("Formato de variantes inválido");
  }
};
