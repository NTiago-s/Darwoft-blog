/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { PencilIcon, TrashIcon, UserIcon } from "../icons/icons";
import { usePublications } from "../../hooks/useGetPublications";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePublication,
  filterPublications,
  updatePublication,
} from "../../store/httpPublicationSlice";
import { createComment } from "../../store/httpCommentSlice";
import { useUsers } from "../../hooks/useGetUsers";
export default function CardPublication() {
  const filtro = localStorage.getItem("filter");
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const { getPublications } = usePublications();
  const publicationsData = useSelector(
    (state) => state.publication.publications
  );
  const { getUsers } = useUsers();
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
      throw new Error();
    }
  };
  const handleCreateComment = async (id) => {
    if (!user) {
      alert("Debes Iniciar Sesion para crear un comentario");
      return;
    }
    if (user.status === "banned") {
      alert("Tu cuenta esta Baneada no podras crear comentarios");
      return;
    }
    const { commentText } = publicationComments[id];
    if (!commentText.trim()) return;
    const data = {
      description: commentText,
      publication: id,
      author: user._id,
    };
    try {
      dispatch(createComment(data));
      handleStatusNoComment(id);
    } catch (error) {
      throw new Error();
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      dispatch(deletePublication(id));
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (filtro) {
      dispatch(filterPublications(filtro));
    } else {
      getPublications();
    }
  }, [filtro, dispatch, getPublications]);

  const sortedPublications =
    publicationsData && Array.isArray(publicationsData.publications)
      ? publicationsData.publications
          .filter((publication) => {
            if (isDashboardRoute) {
              return publication.author._id === user?._id;
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
    <div className="flex flex-col w-full  sm:w-[500px] mx-auto h-auto my-2">
      <div className="text-center">
        {isDashboardRoute ? "Publicaciones creadas" : ""}
      </div>
      {sortedPublications && sortedPublications.length > 0 ? (
        sortedPublications.map((publication, index) => (
          <Link key={index} to={`/publications/${publication._id}`}>
            <div
              key={index}
              className="bg-slate-500 cursor-pointer rounded-lg p-3 my-4"
            >
              <div className="flex">
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

              <div className="flex flex-col gap-3 my-4">
                <div>
                  {editingPublicationId === publication._id ? (
                    <input
                      type="text"
                      value={editedPublicationTitle}
                      className="px-2"
                      onChange={(e) =>
                        setEditedPublicationTitle(e.target.value)
                      }
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
                </div>
                <div>
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
                    <p className="w-full break-words text-sm p-2">
                      {publication.description}
                    </p>
                  )}
                </div>
                {publication.image ? (
                  <div className="flex h-[150px] w-full items-center justify-center rounded-2xl">
                    <img
                      src={publication.image}
                      alt=""
                      className="rounded-2xl  w-[300px] h-full object-cover mx-auto"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-col justify-between">
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
                <div className="flex justify-end">
                  {editingPublicationId ? (
                    <div className="mt-2">
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
              </div>

              {publicationComments[publication._id]?.comment ? (
                <div>
                  <div className="flex gap-2 mt-2">
                    <div className="rounded-full bg-gray-900 text-white min-w-8 h-8  flex justify-center items-center text-center">
                      <div className="rounded-full bg-gray-900 text-white min-w-8 h-8 flex justify-center items-center text-center">
                        {user ? (
                          user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt=""
                              className="rounded-full object-cover size-8"
                            />
                          ) : (
                            `${user.firstName?.charAt(
                              0
                            )}${user.lastName?.charAt(0)}`
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
                  <div className="flex justify-end mt-2">
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
        <div className="text-center mt-10 text-gray-500">
          {isDashboardRoute
            ? "No tienes creada ninguna publicación"
            : "No hay publicaciones creadas con esta tematica"}
        </div>
      )}
    </div>
  );
}
