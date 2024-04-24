import Badge from "../badge";
import { Home, User } from "../icons/icons";

export default function NavBar() {
  const user = localStorage.getItem("user");
  return (
    <div className="flex gap-3 min-h-10">
      <div className="flex  gap-4">
        <Badge icon={<Home />} title={"Inicio"} />
        <Badge
          icon={user ? <User /> : ""}
          title={user ? "Perfil" : "Iniciar Sesion"}
        />
      </div>
    </div>
  );
}
