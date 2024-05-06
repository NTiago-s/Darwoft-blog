import Button from "../../components/buttons";
import CardPublication from "../../components/cardPublication";
import { SettingsIcon } from "../../components/icons/icons";
export default function DashboardUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="w-full px-72">
      <div className="m-auto flex py-4 px-40 justify-between">
        <div className="flex  gap-4">
          <div className="w-10 rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
            {user
              ? `${user?.data?.firstName?.charAt(
                  0
                )}${user?.data?.lastName?.charAt(0)}`
              : ""}
          </div>
          <div className="text-center flex items-center">
            {user ? `${user?.data?.firstName} ${user?.data?.lastName}` : ""}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user.role === "admin" ? "" : <SettingsIcon />}
          <Button txt={"Editar Perfil"} ariaLabel={"Editar Perfil"} />
        </div>
      </div>
      <div>Publicaciones creadas</div>
      <div className="bg-slate-500 rounded-lg">
        <CardPublication />
      </div>
    </section>
  );
}
