/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserIcon } from "../../components/icons/icons";
import BadgeComment from "../../components/badge/badgeComments";
import { fetchPublication } from "../../store/httpPublicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/httpCommentSlice";
import { useComments } from "../../hooks/useGetComments";
import Swal from "sweetalert2";

export default function PublicationDetails() {
  const user = useSelector((state) => state.user.userProfile);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getComments } = useComments();
  const publication = useSelector((state) => state.publication.publications);
  const commentsData = useSelector((state) => state.comment.comments);
  const [newCommentText, setNewCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const Initials = (nombre, apellido) => {
    if (nombre && apellido) {
      return `${nombre.charAt(0)}${apellido.charAt(0)}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPublication(id));
        getComments();
      } catch (error) {
        throw new Error();
      }
    };
    fetchData();
  }, [id, getComments]);

  const handleToggleCommenting = () => {
    setIsCommenting(!isCommenting);
    setNewCommentText("");
  };

  const handleCreateComment = (id) => {
    try {
      if (!user) {
        Swal.fire({
          title: "Debes iniciar sesion para crear un comentario",
          icon: "error",
          confirmButtonColor: "#FF5C5C",
          color: "#FFF",
          background: "#000",
          iconColor: "#FF5C5C",
        });
        return;
      }

      if (user.status === "banned") {
        Swal.fire({
          title: "Tu cuenta esta baneada no podras crear comentarios",
          icon: "error",
          confirmButtonColor: "#FF5C5C",
          color: "#FFF",
          background: "#000",
          iconColor: "#FF5C5C",
        });
        return;
      }

      if (!newCommentText.trim()) return;
      const data = {
        description: newCommentText,
        publication: id,
        author: user._id,
      };
      dispatch(createComment(data));
      setIsCommenting(false);
    } catch (error) {
      throw new Error();
    }
  };

  const filteredComments = commentsData.comments
    ? commentsData.comments
        .filter((comment) => comment.publicationId === id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="md:ml-60 md:mr-6 lg:ml-0 lg:px-72">
      <div className="w-full bg-slate-800 rounded-lg p-4 my-4">
        <div className="flex justify-between m-3">
          <div className="flex gap-2">
            <div className="rounded-full bg-gray-900 text-white size-14 flex justify-center items-center text-center">
              {publication?.publication?.author?.profileImage ? (
                <img
                  src={publication?.publication?.author?.profileImage}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                Initials(
                  publication?.publication?.author?.firstName,
                  publication?.publication?.author?.lastName
                )
              )}
            </div>
            <div className="text-center flex text-white items-center">
              {`${publication?.publication?.author?.firstName} ${publication?.publication?.author?.lastName}`}
            </div>
          </div>
        </div>
        <h2 className="w-full break-words text-2xl text-white font-semibold p-2">
          {publication?.publication?.title}
        </h2>
        <p className="w-full break-words text-white/80 text-base p-2">
          {publication?.publication?.description}
        </p>
        {publication?.publication?.image ? (
          <div className="flex justify-center mx-auto h-[350px] w-full  rounded-xl">
            <img
              src={publication?.publication?.image}
              alt={publication?.publication?.title}
              className="rounded-xl h-full w-full object-scale-down"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex w-full flex-wrap justify-end">
          <div className="flex w-full flex-wrap">
            {publication?.publication?.themes.map((theme, index) => (
              <div
                className="flex justify-center rounded-xl m-2 p-[6px] gap-2 bg-blue-100 text-blue-800 hover:text-black text-xs font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
                key={index}
              >
                {theme.name}
              </div>
            ))}
          </div>
          {!isCommenting && (
            <button
              className="rounded-xl m-2 p-[6px] gap-2 text-white hover:bg-emerald-300 hover:text-black text-xs font-medium"
              onClick={handleToggleCommenting}
            >
              Comentar
            </button>
          )}
        </div>
        {isCommenting && (
          <div>
            <div className="flex gap-2">
              <div className="rounded-full bg-gray-900 text-white min-w-8 h-8  flex justify-center items-center text-center">
                {user ? (
                  user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt=""
                      className="rounded-full object-cover size-8"
                    />
                  ) : (
                    `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
                  )
                ) : (
                  <UserIcon />
                )}
              </div>
              <input
                type="text"
                className="w-full rounded-lg px-3 text-base bg-transparent border-white text-white border-2"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="rounded-xl m-2 p-[6px] gap-2 text-white hover:bg-emerald-300 hover:text-black text-xs font-medium"
                onClick={handleToggleCommenting}
              >
                Cancelar
              </button>
              <button
                className="rounded-xl m-2 p-[6px] gap-2 text-white hover:bg-emerald-300 hover:text-black text-xs font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateComment(publication.publication._id);
                }}
              >
                Responder
              </button>
            </div>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex flex-col justify-between gap-3 max-h-[calc(100vh-300px)] overflow-x-hidden overflow-y-auto">
          {filteredComments.map((comment, index) => (
            <div key={index}>
              <BadgeComment
                id={comment._id}
                title={comment.description}
                author={comment.author}
                publication={publication}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
