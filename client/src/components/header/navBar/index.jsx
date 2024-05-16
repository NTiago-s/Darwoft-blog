import { useLocation } from "react-router-dom";
import Badge from "../../badge";
import {
  CreatePublicationIcon,
  Home,
  LoginIcon,
  User,
} from "../../icons/icons";
import BadgeTheme from "../../badge/badgeThemes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useThemes } from "../../../hooks/useGetThemes";
import { filterPublications } from "../../../store/httpPublicationSlice";
import { useDispatch } from "react-redux";
import { usePublications } from "../../../hooks/useGetPublications";
import CreatePublicationModal from "../../modal/createModal";
export default function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const filtro = localStorage.getItem("filter");
  const user = useSelector((state) => state.user.userProfile);
  const { getThemes } = useThemes();
  const { getPublications } = usePublications();
  const { themes } = useSelector((state) => state.theme.themes);
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const dashPage = location.pathname === "/dashboard";
  const randomPage = location.pathname === "/*";
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [createPublication, setCreatePublication] = useState(false);

  useEffect(() => {
    if (filtro) {
      setSelectedTheme(filtro);
    }
  }, [filtro]);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    localStorage.setItem("filter", themeId);
    dispatch(filterPublications());
  };

  const resetFilter = () => {
    getPublications();
    localStorage.removeItem("filter");
    setSelectedTheme(null);
  };

  const handleCreatePublication = () => {
    setCreatePublication(true);
  };

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  return (
    <div className="flex md:max-w-[192px] lg:max-w-full w-full flex-col">
      <div className="flex  md:flex-col items-center gap-2">
        <div className="w-full">
          <Badge
            icon={<Home />}
            title={"Inicio"}
            to={"/"}
            classname="!w-full"
          />
        </div>
        <div className="flex md:hidden">
          {user && (
            <Badge
              icon={user ? <CreatePublicationIcon /> : ""}
              title={user ? "Crear" : ""}
              click={handleCreatePublication}
            />
          )}
        </div>
        <div className="hidden md:block w-full">
          {!isLoginPage && !isRegisterPage && !dashPage && (
            <Badge
              icon={user ? <User /> : <LoginIcon />}
              title={user ? "Perfil" : "Iniciar Sesión"}
              to={user ? "/dashboard" : "/login"}
              classname="!w-full"
            />
          )}
        </div>
        {createPublication && (
          <CreatePublicationModal state={setCreatePublication} />
        )}
      </div>
      {!isLoginPage && !isRegisterPage && !randomPage && (
        <div className="hidden md:flex md:flex-col">
          <h4 className="font-semibold text-center lg:text-lg mt-3">
            Tematicas Disponibles:
          </h4>
          <div className="flex flex-col gap-2 mt-2">
            {themes &&
              Array.isArray(themes) &&
              themes.map((theme, index) => (
                <BadgeTheme
                  key={index}
                  title={theme.name}
                  id={theme._id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleThemeSelect(theme._id);
                  }}
                  selected={selectedTheme === theme._id}
                />
              ))}
          </div>
          <div className="p-2 text-center text-red-600 font-medium text-xl">
            {selectedTheme ? (
              <button onClick={resetFilter} className="underline">
                Eliminar filtro
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
