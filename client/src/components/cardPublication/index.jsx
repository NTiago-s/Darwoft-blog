/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { PencilIcon, SettingsIcon, TrashIcon, UserIcon } from "../icons/icons";
import { usePublications } from "../../hooks/useGetPublications";
import { useEffect, useState } from "react";
import { http } from "../../services/http";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePublication,
  updatePublication,
} from "../../store/httpPublicationSlice";
import { createComment } from "../../store/httpCommentSlice";
export default function CardPublication() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { getPublications } = usePublications();
  const publicationsData = useSelector(
    (state) => state.publication.publications
  );
  const [publicationComments, setPublicationComments] = useState({});
  const [editingPublicationId, setEditingPublicationId] = useState(null);
  const [editedPublicationDescription, setEditedPublicationDescription] =
    useState("");
  const [editedPublicationTitle, setEditedPublicationTitle] = useState("");
  const isDashboardRoute = location.pathname === "/dashboard";

  const Initials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`;
  };

  const handleStatusComment = (id) => {
    setPublicationComments({
      ...publicationComments,
      [id]: { comment: true, commentText: "" },
    });
  };

  const handleStatusNoComment = (id) => {
    setPublicationComments({
      ...publicationComments,
      [id]: { comment: false, commentText: "" },
    });
  };

  const handleUpdatePublication = async (id) => {
    try {
      let formData = new FormData();
      formData.append("publicationId", id);
      formData.append("description", editedPublicationDescription);
      formData.append("title", editedPublicationTitle);
      dispatch(updatePublication(formData));
      setEditingPublicationId(null);
    } catch (error) {
      console.error("Error updating publication:", error);
    }
  };
  const handleCreateComment = async (id) => {
    if (!user) {
      alert("Debes Iniciar Sesion para crear un Comentario");
      return;
    }
    const { commentText } = publicationComments[id];
    if (!commentText.trim()) return;
    const data = {
      description: commentText,
      publication: id,
      author: user.data._id,
    };
    try {
      dispatch(createComment(data));
      handleStatusNoComment(id);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      dispatch(deletePublication(id));
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  useEffect(() => {
    getPublications();
  }, [getPublications]);

  const sortedPublications =
    publicationsData && Array.isArray(publicationsData.publications)
      ? publicationsData.publications
          .filter((publication) => {
            if (isDashboardRoute) {
              return publication.author._id === user.data._id;
            } else {
              return true;
            }
          })
          .slice()
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
      : [];

  return (
    <div className="flex flex-col h-auto my-2">
      <div>{isDashboardRoute ? "Publicaciones creadas" : ""}</div>
      {sortedPublications && sortedPublications.length > 0 ? (
        sortedPublications.map((publication, index) => (
          <Link key={index} to={`/publications/${publication._id}`}>
            <div
              key={index}
              className="bg-slate-500 cursor-pointer rounded-lg p-4 my-4"
            >
              <div className="flex justify-between m-3">
                <div className="flex gap-2">
                  <div className="rounded-full bg-gray-900 text-white w-14 h-14 flex justify-center items-center text-center">
                    {publication.author.profileImage ? (
                      <img
                        src={publication.author.profileImage}
                        alt=""
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      Initials(
                        publication.author.firstName,
                        publication.author.lastName
                      )
                    )}
                  </div>
                  <div className="text-center flex items-center">
                    {`${publication.author.firstName}  ${publication.author.lastName}`}
                  </div>
                </div>
                <div>
                  <div className="flex justify-end">
                    {isDashboardRoute ? (
                      <div className="flex p-2 gap-4 rounded-lg">
                        <button
                          className="flex items-center my-2 bg-green-600 hover:bg-green-800 p-1 rounded-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingPublicationId(publication._id);
                            setEditedPublicationDescription(
                              publication.description
                            );
                            setEditedPublicationTitle(publication.title);
                          }}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          className="flex items-center my-2 bg-red-600 hover:bg-red-800 p-1 rounded-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeletePublication(publication._id);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 m-3 p-4">
                {editingPublicationId === publication._id ? (
                  <input
                    type="text"
                    value={editedPublicationTitle}
                    className="px-2"
                    onChange={(e) => setEditedPublicationTitle(e.target.value)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                ) : (
                  <h2 className="w-full break-words p-2 text-lg font-semibold">
                    {publication.title}
                  </h2>
                )}

                {editingPublicationId === publication._id ? (
                  <input
                    type="text"
                    value={editedPublicationDescription}
                    onChange={(e) =>
                      setEditedPublicationDescription(e.target.value)
                    }
                    className="px-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                ) : (
                  <p className="w-full break-words p-2">
                    {publication.description}
                  </p>
                )}
                <div className="flex justify-center rounded-2xl">
                  {publication.image ? (
                    <img
                      src={publication.image}
                      alt=""
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  {publication.themes.map((theme, index) => (
                    <div
                      className="flex w-auto justify-center rounded-xl m-2 p-[6px] gap-2 bg-blue-100 text-blue-800 hover:text-black text-xs font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
                      key={index}
                    >
                      {theme.name}
                    </div>
                  ))}
                </div>

                {editingPublicationId ? (
                  <div>
                    <button
                      className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdatePublication(publication._id);
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdatePublication(publication._id);
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <button
                    className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatusComment(publication._id);
                    }}
                  >
                    Comentar
                  </button>
                )}
              </div>

              {publicationComments[publication._id]?.comment ? (
                <div>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-gray-900 text-white min-w-8 h-8  flex justify-center items-center text-center">
                      <div className="rounded-full bg-gray-900 text-white min-w-8 h-8 flex justify-center items-center text-center">
                        {user?.data ? (
                          user.data.profileImage ? (
                            <img
                              src={user.data.profileImage}
                              alt=""
                              className="rounded-full object-cover size-8"
                            />
                          ) : (
                            `${user.data.firstName?.charAt(
                              0
                            )}${user.data.lastName?.charAt(0)}`
                          )
                        ) : (
                          <UserIcon />
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full rounded-lg px-3 text-base bg-transparent border-black border-2 "
                      value={
                        publicationComments[publication._id]?.commentText || ""
                      }
                      onChange={(e) =>
                        setPublicationComments({
                          ...publicationComments,
                          [publication._id]: {
                            ...publicationComments[publication._id],
                            commentText: e.target.value,
                          },
                        })
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleStatusNoComment(publication._id);
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCreateComment(publication._id);
                      }}
                    >
                      Comentar
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500">
          {isDashboardRoute ? "No tienes creada ninguna publicación" : ""}
        </div>
      )}
    </div>
  );
}
