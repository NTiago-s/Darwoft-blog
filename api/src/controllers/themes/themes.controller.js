import { Theme } from "../../models/Themes.model.js";
// Endpoint para obtener todas las Tematicas
export const getThemes = async (req, res) => {
  try {
    const themess = await Theme.find();
    res.status(200).json({ themess });
  } catch (error) {
    res.status(500).json({ message: "Error al traer las Tematicas" });
  }
};

//endpoint para crear una Tematica
export const createThemes = async (req, res) => {
  try {
    const { name, description } = req.body;
    const themes = new themes({ name, description });
    await themes.save();
    res.status(201).json({ themes });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la Tematica" });
  }
};

// Endpoint para modificar una Tematica existente
export const updateThemes = async (req, res) => {
  try {
    const { themesId, description } = req.body;
    const themes = await Theme.findById(themesId);
    if (!themes) {
      res.status(404).json({ message: "Tematica no encontrada" });
      return;
    }
    themes.description = description;
    await themes.save();
    res.status(200).json({ message: "Tematica Modificada" });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar la Tematica" });
  }
};

export const deleteThemes = async (req, res) => {
  try {
    const { themesId } = req.body;
    await Theme.findByIdAndDelete(themesId);
    res.status(204).json({ message: "Tematica Eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la Tematica" });
  }
};
