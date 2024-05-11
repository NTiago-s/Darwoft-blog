/* eslint-disable react/prop-types */
import { CloseIcon, PencilIcon } from "../icons/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../store/httpCommentSlice";

export default function BadgeComment({ title, id, author, publication }) {
  const user = useSelector((state) => state.user.userProfile);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const dispatch = useDispatch();
  const Initials = (nombre, apellido) => {
    if (nombre && apellido) {
      return `${nombre.charAt(0)}${apellido.charAt(0)}`;
    } else {
      return "";
    }
  };

  const handleDeleteComments = async () => {
    if (
      user &&
      (user._id === author?._id ||
        user._id === publication?.publication?.author?._id)
    ) {
      try {
        dispatch(deleteComment(id));
      } catch (error) {
        console.error("Error al eliminar la temática:", error);
      }
    } else {
      alert("No tienes permisos para eliminar este comentario.");
    }
  };

  const handleEditComment = async () => {
    if (user && user._id === author?._id) {
      setEditing(true);
    } else {
      alert("No tienes permisos para editar este comentario.");
    }
  };

  const handleUpdateComment = async () => {
    try {
      const data = {
        commentId: id,
        description: editedTitle,
      };
      dispatch(updateComment(data));
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
          <div className="rounded-full bg-gray-900 mt-2 text-white w-14 h-14 flex justify-center items-center text-center">
            {author?.profileImage ? (
              <img
                src={author?.profileImage}
                alt=""
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              Initials(author?.firstName, author?.lastName)
            )}
          </div>
          <div className="text-center font-semibold flex mt-2 text-lg items-center">
            {`${author?.firstName}  ${author?.lastName}`}
          </div>
        </div>
        <div>
          {user && user._id === author?._id && (
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
          {user &&
            (user._id === author?._id ||
              user._id === publication?.publication?.author?._id) && (
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
