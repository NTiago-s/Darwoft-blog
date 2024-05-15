/* eslint-disable react/prop-types */
import { CloseIcon } from "../icons/icons";
import { useLocation } from "react-router-dom";
import Badge from "../badge";
import { User } from "../icons/icons";
import BadgeTheme from "../badge/badgeThemes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useThemes } from "../../hooks/useGetThemes";
import { filterPublications } from "../../store/httpPublicationSlice";
import { useDispatch } from "react-redux";
import { usePublications } from "../../hooks/useGetPublications";
const NavMobile = ({ state }) => {
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
    <div className="fixed top-0 left-0 w-full h-screen items-center justify-center bg-gray-900 z-30">
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
        <div className="">
          <div className="flex flex-col w-full mt-20 text-center items-center gap-2">
            <div className={`${user ? "flex" : "flex"} sm:flex`}>
              {!isLoginPage && !isRegisterPage && !dashPage && (
                <Badge
                  icon={user ? <User /> : ""}
                  title={user ? "Perfil" : "Iniciar Sesión"}
                  to={user ? "/dashboard" : "/login"}
                />
              )}
            </div>
          </div>
          {!isLoginPage && !isRegisterPage && (
            <div className="">
              <h4 className="font-semibold text-xl text-white mt-3">
                Tematicas Disponibles:
              </h4>
              <div className="flex flex-col gap-3 mt-3">
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
                      selected={selectedTheme}
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
      </div>
    </div>
  );
};

export default NavMobile;
