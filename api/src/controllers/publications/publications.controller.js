import { Publication } from "../../models/Publications.model.js";
import { Theme } from "../../models/Themes.model.js";
import { User } from "../../models/User.model.js";
// Endpoint para obtener todas las Publicaciones
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
      .populate("author")
      .populate("themes");
    res.status(200).json({ publications });
  } catch (error) {
    res.status(500).json({ message: "Error al traer las Publicaciones" });
  }
};

export const filterPublications = async (req, res) => {
  try {
    const userId = req.body.userId;
    const publications = await Publication.find({ author: userId })
      .populate("author")
      .populate("themes");
    res.status(200).json({ publications });
  } catch (error) {
    res.status(500).json({ message: "Error al traer las Publicaciones" });
  }
};

export const createPublication = async (req, res) => {
  try {
    const { description, themes, author } = req.body.body;

    const existingUser = await User.findById(author);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "El autor no existe en la base de datos" });
    }

    const existingThemes = await Theme.find({ _id: { $in: themes } });
    const existingThemeIds = existingThemes.map((theme) => theme._id);

    const publication = new Publication({
      description,
      date: new Date(),
      author: existingUser._id,
      themes: existingThemeIds,
    });
    console.log(publication);
    await publication.save();
    res.status(201).json({ publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la Publicación" });
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
    const { Id } = req.body;
    console.log(Id);
    await Publication.findByIdAndDelete(Id);
    res.status(200).json({ message: "Publicacion Eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la Publicacion" });
  }
};
