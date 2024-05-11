import { Comment } from "../../models/Comments.model.js";
import { Publication } from "../../models/Publications.model.js";

// Endpoint para obtener todos los Comentarios
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("author");
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error al traer los Comentarios" });
  }
};

//endpoint para crear un comentario
export const createComment = async (req, res) => {
  try {
    const { description, author, publication } = req.body;
    const comment = new Comment({
      description,
      author,
      date: new Date(),
      publicationId: publication,
    });
    await comment.save();

    const newCommentId = comment._id;

    const publicationToUpdate = await Publication.findById(publication);

    publicationToUpdate.comments.push(newCommentId);
    await publicationToUpdate.save();

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el Comentario" });
  }
};

// Endpoint para modificar un Comentario existente
export const updateComment = async (req, res) => {
  try {
    const { commentId, description } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comentario no encontrado" });
      return;
    }
    comment.description = description;
    await comment.save();
    res.status(200).json({ message: "Comentario Modificado" });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar el Comentario" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { Id } = req.body;
    await Comment.findByIdAndDelete(Id);
    res.status(200).json({ message: "Comentario Eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el Comentario" });
  }
};
