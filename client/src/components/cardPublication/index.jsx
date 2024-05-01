import { Adjusment } from "../icons/icons";
import { usePublicationsEffect } from "../../utils/use";

export default function CardPublication() {
  const Initials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`;
  };

  const publicationsData = usePublicationsEffect();
  return (
    <div className="flex flex-col h-auto p-3 max-w-[700px]">
      {publicationsData.data &&
        Array.isArray(publicationsData.data.publications) &&
        publicationsData.data.publications.map((publication, index) => (
          <div key={index}>
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
                <div className="flex h-auto w-auto justify-end p-4">
                  <button>
                    <Adjusment />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex">
              {publication.themes.map((theme, index) => (
                <div
                  className="flex w-auto justify-center rounded-xl m-2 p-2 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
                  key={index}
                >
                  {theme.name}
                </div>
              ))}
            </div>
            <div className="text-2xl p-2">{publication.title}</div>
            <p className="w-full break-words p-2">{publication.description}</p>
            <div className="max-h-40 flex">
              <input type="text" className="border-2 w-full rounded-lg my-2" />
            </div>
          </div>
        ))}
    </div>
  );
}
