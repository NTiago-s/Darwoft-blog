import { useLocation } from "react-router-dom";
import Badge from "../../badge";
import { Home, User } from "../../icons/icons";
// import { useUserEffect } from "../../../utils/useUser";

export default function NavBar() {
  const location = useLocation();
  const user = localStorage.getItem("user");
  // const userData = useUserEffect();

  // Determinar si la ruta actual es login o register
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const dashPage = location.pathname === "/dashboard";
  return (
    <div className="flex gap-3 min-h-10">
      <div className="flex  gap-4">
        <Badge icon={<Home />} title={"Inicio"} to={"/"} />
        {/* Renderizar el botón de inicio de sesión solo si no estamos en la página de login o registro */}
        {!isLoginPage && !isRegisterPage && !dashPage && (
          <Badge
            icon={user ? <User /> : ""}
            title={user ? "Perfil" : "Iniciar Sesión"}
            to={user ? "/dashboard" : "/login"}
          />
        )}
      </div>
    </div>
  );
}
