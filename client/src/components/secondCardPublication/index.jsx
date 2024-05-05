import { SettingsIcon, UserIcon } from "../icons/icons";
import { usePublicationsEffect } from "../../utils/use";
import { useState } from "react";
import { http } from "../../services/http";
export default function SecondCardPublication() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [publicationComments, setPublicationComments] = useState({});

  const Initials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`;
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

  const handleCreateComment = async (id) => {
    const { commentText } = publicationComments[id];
    if (!commentText.trim()) return;
    const data = {
      description: commentText,
      publication: id,
      author: user.data._id,
    };
    console.log(data);
    try {
      const response = await http.post("comments/create", data);
      console.log(response);
      handleStatusNoCommnet(id);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const publicationsData = usePublicationsEffect();
  const sortedPublications = [
    ...(publicationsData.data?.publications || []),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex flex-col cursor-pointer h-auto p-3 max-w-[720px]">
      {sortedPublications &&
        Array.isArray(sortedPublications) &&
        sortedPublications.map((publication, index) => (
          <div key={index} className="bg-slate-500 rounded-lg m-4 p-3">
            <div className="flex justify-between m-3">
              <div className="flex gap-2">
                <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
                  {Initials(
                    publication.author.firstName,
                    publication.author.lastName
                  )}
                </div>
                <div className="text-center flex items-center">
                  {`${publication.author.firstName}  ${publication.author.lastName}`}
                </div>
              </div>
              <div>
                <div className="flex h-auto w-auto justify-end">
                  <button className="rounded-xl p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium">
                    <SettingsIcon />
                  </button>
                </div>
              </div>
            </div>
            <p className="w-full break-words p-2">{publication.description}</p>
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

              <button
                className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                onClick={() => handleStatusCommnet(publication._id)}
              >
                Responder
              </button>
            </div>
            {publicationComments[publication._id]?.comment ? (
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
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                    onClick={() => handleStatusNoCommnet(publication._id)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="rounded-xl m-2 p-[6px] gap-2 text-black hover:bg-emerald-300 hover:text-black text-xs font-medium"
                    onClick={() => handleCreateComment(publication._id)}
                  >
                    Responder
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
}
