import { useLocation } from "react-router-dom";
import Badge from "../../badge";
import { Home, User } from "../../icons/icons";
import { useThemesEffect, useUserEffect } from "../../../utils/use";
import BadgeTheme from "../../badge/badgeThemes";
export default function NavBar() {
  const location = useLocation();
  const user = useUserEffect();
  const themesData = useThemesEffect();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const dashPage = location.pathname === "/dashboard";

  return (
    <div className="flex flex-col gap-3 min-h-10 min-w-80">
      <div className="flex  gap-4">
        <Badge icon={<Home />} title={"Inicio"} to={"/"} />
        {!isLoginPage && !isRegisterPage && !dashPage && (
          <Badge
            icon={user?.data ? <User /> : ""}
            title={user?.data ? "Perfil" : "Iniciar Sesión"}
            to={user?.data ? "/dashboard" : "/login"}
          />
        )}
      </div>
      {!isLoginPage && !isRegisterPage && (
        <div>
          <h4 className="font-semibold text-xl mt-3">Tematicas Disponibles:</h4>
          {themesData.data &&
            Array.isArray(themesData.data.themes) &&
            themesData.data.themes.map((theme, index) => (
              <BadgeTheme
                key={index}
                className="text-black"
                title={theme.name}
                id={theme._id}
              />
            ))}
        </div>
      )}
    </div>
  );
}
