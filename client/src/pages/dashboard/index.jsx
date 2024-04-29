import Button from "../../components/buttons";
import CardPublication from "../../components/cardPublication";
export default function DashboardUser() {
  const user = localStorage.getItem("user");
  return (
    <section>
      <div className="m-auto flex-col flex py-4 max-h-screen justify-center text-center items-center">
        <div className="m-2">Banner del usuario</div>
        <div className="flex">
          <div className="flex flex-col  gap-2">
            <div className="w-10 rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
              TN
            </div>
            <div className="text-center flex items-center">
              Nombre del usuario
            </div>
          </div>
          <div className="flex">
            {user.role === "admin" ? "" : "boton admin"}
            <Button txt={"Editar Perfil"} ariaLabel={"Editar Perfil"} />
          </div>
        </div>
      </div>
      <div>Publicaciones creadas</div>
      <div className="bg-slate-500 rounded-lg">
        <CardPublication />
        <CardPublication />
        <CardPublication />
      </div>
    </section>
  );
}
