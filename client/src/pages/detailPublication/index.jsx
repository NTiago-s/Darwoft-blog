import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../services/http";
import { UserIcon } from "../../components/icons/icons";

export default function PublicationDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [publicationComments, setPublicationComments] = useState({});
  const Initials = (nombre, apellido) => {
    return `${nombre?.charAt(0) || ""}${apellido?.charAt(0) || ""}`;
  };

  const handleStatusCommnet = (id) => {
    setPublicationComments({
      ...publicationComments,
      [id]: { comment: true, commentText: "" },
    });
  };

  const handleStatusNoCommnet = (id) => {
    setPublicationComments({
      ...publicationComments,
      [id]: { comment: false, commentText: "" },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`publications/${id}`);
        setPublication(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

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
      const response = await http.post("comments/create", data);
      console.log(response);
      handleStatusNoCommnet(id);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  return (
    <div className="w-full bg-slate-500 cursor-pointer rounded-lg p-4 my-4">
      <div className="flex justify-between m-3">
        <div className="flex gap-2">
          <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
            {Initials(
              publication?.publication?.author?.firstName,
              publication?.publication?.author?.lastName
            )}
          </div>
          <div className="text-center flex items-center">
            {`${publication?.publication?.author?.firstName} ${publication?.publication?.author?.lastName}`}
          </div>
        </div>
      </div>
      <p className="w-full break-words p-2">
        {publication?.publication?.description}
      </p>
      <div className="flex justify-between">
        <div className="flex">
          {publication?.publication?.themes.map((theme, index) => (
            <div
              className="flex w-auto justify-center rounded-xl m-2 p-[6px] gap-2 bg-blue-100 text-blue-800 hover:text-black text-xs font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
              key={index}
            >
              {theme.name}
            </div>
          ))}
        </div>
        <button
          className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
          onClick={() => handleStatusCommnet(publication?.publication?._id)}
        >
          Responder
        </button>
      </div>
      {publicationComments[publication?.publication?._id]?.comment ? (
        <div>
          <div className="flex gap-2">
            <div className="rounded-full bg-gray-900 text-white min-w-8 h-8  flex justify-center items-center text-center">
              {user ? (
                `${user?.data?.firstName?.charAt(
                  0
                )}${user?.data?.lastName?.charAt(0)}`
              ) : (
                <UserIcon />
              )}
            </div>
            <input
              type="text"
              className="w-full rounded-lg px-3 text-base bg-transparent border-black border-2 "
              value={
                publicationComments[publication?.publication?._id]
                  ?.commentText || ""
              }
              onChange={(e) =>
                setPublicationComments({
                  ...publicationComments,
                  [publication?.publication?._id]: {
                    ...publicationComments[publication?.publication?._id],
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
                handleStatusNoCommnet(publication?.publication?._id);
              }}
            >
              Cancelar
            </button>
            <button
              className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleCreateComment(publication?.publication?._id);
              }}
            >
              Responder
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between">
        <div className="flex">
          {publication?.publication?.comments.map((comment, index) => (
            <div
              className="flex w-auto justify-center rounded-xl m-2 p-[6px] gap-2 bg-blue-100 text-blue-800 hover:text-black text-xs font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
              key={index}
            >
              {comment.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
