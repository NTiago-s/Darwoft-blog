import { CloseIcon, PhotoIcon, UserIcon } from "../icons/icons";
import { Link } from "react-router-dom";
import { useRef, useState } from "react"; // Importa useState
import { useThemesEffect, useUserEffect } from "../../utils/use";
import { useDispatch } from "react-redux";
import { createPublication } from "../../store/httpPublication";
export default function CreatePublication() {
  const user = useUserEffect();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [publicationText, setPublicationText] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const themesData = useThemesEffect();
  const fileInputRef = useRef(null);

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
    if (!user.data) {
      alert("Debes Iniciar Sesion para crear una Publicacion");
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
      formData.append("author", user.data._id);
      formData.append("themes", selectedThemes);
      dispatch(createPublication(formData));
      handleclearInputs();
    } catch (error) {
      console.error("Error creating publication:", error);
    }
  };

  return (
    <div className="h-auto p-3 w-full border-2 rounded-lg">
      <div className="flex m-2 gap-2">
        <div>
          {user.data ? (
            <Link to={"/dashboard"}>
              <div className="rounded-full my-2  bg-gray-900 text-white size-16 flex justify-center items-center text-center">
                {user?.data?.profileImage ? (
                  <img
                    src={user?.data?.profileImage}
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  `${user?.data?.firstName?.charAt(
                    0
                  )}${user?.data?.lastName?.charAt(0)}`
                )}
              </div>
            </Link>
          ) : (
            <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
              {user.data ? "" : <UserIcon />}
            </div>
          )}
        </div>
        <div className="flex flex-col  w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-2xl p-2"
            placeholder="Ingresa el titulo"
          />
          <hr />
          <textarea
            value={publicationText}
            onChange={(e) => setPublicationText(e.target.value)}
            name=""
            cols="10"
            rows="10"
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-2xl p-2"
            placeholder="Ingresa la descripción"
          ></textarea>
          <label htmlFor="fileInput" className="cursor-pointer">
            <PhotoIcon />
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {imagePreview && (
        <div className="flex items-start">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs mt-2 ml-20 rounded-xl mr-2"
          />
          <button onClick={handleDeleteImage} className="text-red-500 mt-4">
            <CloseIcon />
          </button>
        </div>
      )}
      <div className="flex flex-col ml-[60px] mt-5">
        Tematicas:
        <div>
          {themesData.data &&
            Array.isArray(themesData.data.themes) &&
            themesData.data.themes.map((theme, index) => (
              <label
                key={index}
                className="inline-flex items-center gap-1 ml-4 my-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
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
  );
}
