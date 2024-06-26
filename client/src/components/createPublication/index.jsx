import { CloseIcon, PhotoIcon, UserIcon } from "../icons/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPublication } from "../../store/httpPublicationSlice";
import { useUsers } from "../../hooks/useGetUsers";
import Header from "../header";
import Swal from "sweetalert2";
import NavMobile from "../modal/navMobile";
export default function CreatePublication() {
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
  const [navMobile, setNavMobile] = useState(false);
  const [mobile, setMobile] = useState(false);
  const activeMobile = window.innerWidth < 768;
  const dashPage = location.pathname === "/dashboard";
  const loginPage = location.pathname === "/login";
  const { themes } = useSelector((state) => state.theme.themes);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (activeMobile) {
      setNavMobile(true);
      setMobile(false);
    }
  }, [activeMobile]);

  const handleoffNavMobile = () => {
    if (!navMobile) {
      navigate("/dashboard");
    }
  };

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

  const handleNavMobile = () => {
    setMobile(!mobile);
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
      return;
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
      return;
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
    <div className="flex md:flex-col w-full rounded-lg border-2 overflow-y-scroll bg-white">
      <div className="flex md:flex-row flex-col w-full max-w-full">
        <div className="flex justify-between md:justify-start items-center md:items-start p-4">
          <div className="flex items-center md:hidden">
            <Header />
          </div>
          <div className="flex items-center">
            <div className={`${!dashPage && !loginPage ? "flex" : "hidden"}`}>
              {user ? (
                <div
                  className="rounded-full flex bg-gray-900 items-center justify-center text-white sm:size-16  size-10"
                  onClick={() => {
                    handleNavMobile();
                    handleoffNavMobile();
                  }}
                >
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      alt=""
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`
                  )}
                </div>
              ) : (
                <div
                  className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center"
                  onClick={() => {
                    handleNavMobile();
                    handleoffNavMobile();
                  }}
                >
                  {user ? "" : <UserIcon />}
                </div>
              )}
              {mobile && <NavMobile state={setMobile} />}
            </div>
          </div>
        </div>
        <div className="md:flex p-1 flex-col w-full hidden">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-xl p-2 outline-none"
            placeholder="Ingresa el titulo"
          />
          <hr />
          <textarea
            value={publicationText}
            onChange={handlePublicationTextChange}
            className="rounded-xl w-full my-2  min-h-14 max-h-32
    text-2xl placeholder:text-xl p-2 outline-none [form-sizing:content] resize-none"
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
      </div>

      <div className="md:flex md:ml-24 hidden justify-between md:flex-col">
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
          <div className="flex flex-wrap w-full">
            {themes &&
              Array.isArray(themes) &&
              themes.map((theme, index) => (
                <label key={index} className="flex items-center gap-1 my-3">
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
