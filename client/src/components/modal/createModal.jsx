/* eslint-disable react/prop-types */
import { CloseIcon } from "../icons/icons";
import { PhotoIcon } from "../icons/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPublication } from "../../store/httpPublicationSlice";
import { useUsers } from "../../hooks/useGetUsers";
import Swal from "sweetalert2";
const CreatePublicationModal = ({ state }) => {
  const { getUsers } = useUsers();
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [publicationText, setPublicationText] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { themes } = useSelector((state) => state.theme.themes);
  const fileInputRef = useRef(null);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleThemeSelection = (themeId) => {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== themeId));
      setError("");
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
    setErrorTitle("");
    setImageFile(null);
    setImagePreview(null);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrorTitle("");
  };

  const handlePublicationTextChange = (e) => {
    setPublicationText(e.target.value);
    setErrorTitle("");
  };

  const handleCreatePublication = async () => {
    if (!user) {
      Swal.fire({
        title: "Debes Iniciar Sesion para poder crear una publicación",
        icon: "error",
        confirmButtonColor: "#FF5C5C",
        color: "#FFF",
        background: "#000",
        iconColor: "#FF5C5C",
      });
    }
    if (user.status === "banned") {
      Swal.fire({
        title: "Tu cuenta esta baneada no podras crear publicaciones",
        icon: "error",
        confirmButtonColor: "#FF5C5C",
        color: "#FFF",
        background: "#000",
        iconColor: "#FF5C5C",
      });
    }
    if (selectedThemes.length === 0) {
      setError("Seleccione al menos 1 temática.");
      return;
    } else {
      setError("");
    }
    if (title === "" || publicationText === "") {
      setErrorTitle(
        "Falta los parametros de la descripcion, Titulo y descripcion."
      );
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
      throw new Error();
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen items-center justify-center bg-gray-200 z-30">
      <div className="flex flex-col gap-2 bg-primary-blue-60 border-2 h-screen rounded-lg items-center relative">
        <div className="flex flex-col">
          <button
            className="p-2 rounded-full text-black bg-red bg-red-500 absolute top-2 right-2"
            onClick={() => {
              state(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col mt-7 p-4">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-xl placeholder:text-xl p-2 outline-none"
            placeholder="Ingresa el titulo"
          />
          <hr />
          <textarea
            value={publicationText}
            onChange={handlePublicationTextChange}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
     placeholder:text-xl p-2 outline-none [form-sizing:content] resize-none "
            placeholder="Ingresa la descripción"
          ></textarea>
          {errorTitle && <div className="text-red-500 ml-4">{errorTitle}</div>}
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
        <div className="flex flex-col">
          {imagePreview ? (
            <div className="px-6">
              <div className="flex flex-col mt-3 items-start">
                <div className="flex flex-col w-80 h-60 mb-10">
                  <div className="flex justify-end mr-4">
                    <button
                      onClick={handleDeleteImage}
                      className="text-red-500 my-2"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="px-8 w-20 h-10">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={`flex flex-col ${imagePreview ? "px-8" : "px-4"}`}>
            Tematicas:
            <div>
              {themes &&
                Array.isArray(themes) &&
                themes.map((theme, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-1 ml-4 my-3"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox size-4 text-blue-600 cursor-pointer"
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
          <div className="flex justify-center mb-4 px-6">
            <button
              className="flex items-center rounded-3xl p-2 mr-5 mt-2 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer"
              onClick={handleCreatePublication}
            >
              Crear Publicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePublicationModal;
