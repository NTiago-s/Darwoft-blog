import { CloseIcon, PhotoIcon, UserIcon } from "../icons/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux";
import { createPublication } from "../../store/httpPublicationSlice";
import { useUsers } from "../../hooks/useGetUsers";
import Header from "../header";
export default function CreatePublication() {
  const { getUsers } = useUsers();
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [publicationText, setPublicationText] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dashPage = location.pathname === "/dashboard";
  const { themes } = useSelector((state) => state.theme.themes);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleThemeSelection = (themeId) => {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== themeId));
    } else {
      setSelectedThemes([...selectedThemes, themeId]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleclearInputs = () => {
    setTitle("");
    setPublicationText("");
    setSelectedThemes([]);
    setError("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreatePublication = async () => {
    if (!user) {
      alert("Debes Iniciar Sesion para crear una Publicacion");
      return;
    }
    if (user.status === "banned") {
      alert("Tu cuenta esta Baneada no podras crear publicaciones");
      return;
    }
    if (selectedThemes.length === 0) {
      setError("Seleccione al menos 1 temática.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("description", publicationText);
      formData.append("author", user._id);
      formData.append("themes", selectedThemes);
      dispatch(createPublication(formData));
      handleclearInputs();
    } catch (error) {
      console.error("Error creating publication:", error);
    }
  };

  return (
    <div className="flex sm:flex-col w-full p-2 rounded-lg border-2">
      <div className="flex sm:flex-row flex-col w-full">
        <div className="flex justify-between sm:justify-start items-center sm:w-auto sm:items-start sm:px-4 sm:py-4 w-full">
          <div className="flex sm:hidden">
            <Header />
          </div>
          <div className={`${!dashPage ? "flex" : "hidden"}`}>
            {user ? (
              <Link to={"/dashboard"}>
                <div className="rounded-full bg-gray-900 items-center justify-center text-white sm:size-16  size-12 flex">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt=""
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
                  )}
                </div>
              </Link>
            ) : (
              <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
                {user ? "" : <UserIcon />}
              </div>
            )}
          </div>
        </div>
        <div className="sm:flex p-1 flex-col w-full hidden">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-xl p-2 outline-none"
            placeholder="Ingresa el titulo"
          />
          <hr />
          <textarea
            value={publicationText}
            onChange={(e) => setPublicationText(e.target.value)}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-xl p-2 outline-none [form-sizing:content] resize-none"
            placeholder="Ingresa la descripción"
          ></textarea>
          <label className="flex flex-col mb-6 gap-2">
            <div className="cursor-pointer">
              <PhotoIcon />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      <div className="sm:flex sm:ml-24 hidden justify-between sm:flex-col">
        {imagePreview ? (
          <div className="px-6">
            <div className="flex flex-col mt-3 items-start">
              <div className="flex flex-col w-80 h-60 mb-10">
                <div className="flex justify-end">
                  <button
                    onClick={handleDeleteImage}
                    className="text-red-500 my-2"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col">
          Tematicas:
          <div>
            {themes &&
              Array.isArray(themes) &&
              themes.map((theme, index) => (
                <label
                  key={index}
                  className="inline-flex items-center gap-1 ml-4 my-3"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
                    checked={selectedThemes.includes(theme._id)}
                    onChange={() => handleThemeSelection(theme._id)}
                  />
                  <span className="mr-3 text-sm text-gray-700 ">
                    {theme.name}
                  </span>
                </label>
              ))}
            {error && <div className="text-red-500 ml-4">{error}</div>}
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center rounded-3xl p-2 mr-5 mt-2 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
            onClick={handleCreatePublication}
          >
            Crear Publicación
          </button>
        </div>
      </div>
    </div>
  );
}
