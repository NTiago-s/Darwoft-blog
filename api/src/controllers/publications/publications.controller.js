import { Comment } from "../../models/Comments.model.js";
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

export const getPublication = async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findById(id)
      .populate("author")
      .populate("themes")
      .populate("comments");
    if (!publication) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.status(200).json({ publication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la publicación" });
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
    await Publication.findByIdAndDelete(Id);
    await Comment.deleteMany({ publicationId: Id });

    res
      .status(200)
      .json({ message: "Publicación y comentarios eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar la publicación y los comentarios:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar la publicación y los comentarios" });
  }
};
