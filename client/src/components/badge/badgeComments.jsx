/* eslint-disable react/prop-types */
import { CloseIcon, PencilIcon } from "../icons/icons";
import { useUserEffect } from "../../utils/use";
import { http } from "../../services/http";
import { useState } from "react";

export default function BadgeComment({ title, id, author, publication }) {
  const user = useUserEffect();
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const Initials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`;
  };

  const handleDeleteComments = async () => {
    if (
      user.data &&
      (user.data._id === author._id ||
        user.data._id === publication.publication.author._id)
    ) {
      try {
        const response = await http.deleteCreates("comments/delete", id);
        if (response.status === 204) window.location.reload();
      } catch (error) {
        console.error("Error al eliminar la temática:", error);
      }
    } else {
      alert("No tienes permisos para eliminar este comentario.");
    }
  };

  const handleEditComment = async () => {
    if (user.data && user.data._id === author._id) {
      setEditing(true);
    } else {
      alert("No tienes permisos para editar este comentario.");
    }
  };

  const handleUpdateComment = async () => {
    try {
      const response = await http.put(`comments/update`, {
        commentId: id,
        description: editedTitle,
      });
      if (response.status === 200) window.location.reload();
      setEditing(false);
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full border-2
     items-center justify-between text-center rounded-lg m-2 px-2 gap-2  text-sm font-medium"
    >
      <div className="flex w-full justify-between items-end">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="rounded-full bg-gray-900 mt-2 text-white min-w-14 h-14 flex justify-center items-center text-center">
            {Initials(author.firstName, author.lastName)}
          </div>
          <div className="text-center font-semibold flex mt-2 text-lg items-center">
            {`${author.firstName}  ${author.lastName}`}
          </div>
        </div>
        <div>
          {user?.data && user.data._id === author._id && (
            <>
              {!editing && (
                <button
                  onClick={handleEditComment}
                  className="m-2 rounded-full bg-green-500 hover:bg-green-800 p-1"
                >
                  <PencilIcon />
                </button>
              )}
              {editing && (
                <>
                  <button
                    onClick={handleUpdateComment}
                    className="m-2 rounded-full bg-blue-500 hover:bg-blue-800 p-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditedTitle(title);
                    }}
                    className="m-2 rounded-full bg-gray-500 hover:bg-gray-800 hover:text-white p-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </>
          )}
          {user?.data &&
            (user.data._id === author._id ||
              user.data._id === publication.publication.author._id) && (
              <button
                onClick={handleDeleteComments}
                className="m-2 rounded-full bg-red-500 hover:bg-red-800 p-1"
              >
                <CloseIcon />
              </button>
            )}
        </div>
      </div>
      <div className="w-full">
        {!editing && (
          <p className="w-full font-light text-base ml-4 my-4  flex">{title}</p>
        )}
        {editing && (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full font-light text-base my-4  p-1 flex"
          />
        )}
      </div>
    </div>
  );
}
