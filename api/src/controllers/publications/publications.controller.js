import { Publication } from "../../models/Publications.model.js";
// Endpoint para obtener todas las Publicaciones
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json({ publications });
  } catch (error) {
    res.status(500).json({ message: "Error al traer las Publicaciones" });
  }
};

//endpoint para crear un Publicacion
export const createPublication = async (req, res) => {
  try {
    const { description, title, themes } = req.body;
    const publication = new Publication({
      title,
      description,
      date: new Date(),
      themes: themes,
    });
    await publication.save();
    res.status(201).json({ publication });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la Publicacion" });
  }
};

// Endpoint para modificar un Publicacion existente
export const updatePublication = async (req, res) => {
  try {
    const { publicationId, description } = req.body;
    const publication = await Publication.findById(publicationId);
    if (!publication) {
      res.status(404).json({ message: "Publicacion no encontrada" });
      return;
    }
    publication.description = description;
    await publication.save();
    res.status(200).json({ message: "Publicacion Modificada" });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar la Publicacion" });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { publicationId } = req.body;
    await Publication.findByIdAndDelete(publicationId);
    res.status(204).json({ message: "Publicacion Eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la Publicacion" });
  }
};
