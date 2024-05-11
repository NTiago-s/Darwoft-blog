import { useLocation } from "react-router-dom";
import Badge from "../../badge";
import { Home, User } from "../../icons/icons";
import BadgeTheme from "../../badge/badgeThemes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useThemes } from "../../../hooks/useGetThemes";
import { filterPublications } from "../../../store/httpPublicationSlice";
import { useDispatch } from "react-redux";
import { usePublications } from "../../../hooks/useGetPublications";
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
  const [selectedTheme, setSelectedTheme] = useState(null);

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

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  return (
    <div className=" fixed flex flex-col  gap-3 min-h-10 min-w-80">
      <div className="flex  gap-4">
        <Badge icon={<Home />} title={"Inicio"} to={"/"} />
        {!isLoginPage && !isRegisterPage && !dashPage && (
          <Badge
            icon={user ? <User /> : ""}
            title={user ? "Perfil" : "Iniciar Sesión"}
            to={user ? "/dashboard" : "/login"}
          />
        )}
      </div>
      {!isLoginPage && !isRegisterPage && (
        <div>
          <h4 className="font-semibold text-xl mt-3">Tematicas Disponibles:</h4>
          <div>
            {themes &&
              Array.isArray(themes) &&
              themes.map((theme, index) => (
                <BadgeTheme
                  key={index}
                  title={theme.name}
                  id={theme._id}
                  onClick={() => handleThemeSelect(theme._id)}
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
