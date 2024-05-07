import { useState } from "react";
import Button from "../../components/buttons";
import CardPublication from "../../components/cardPublication";
import { SettingsIcon } from "../../components/icons/icons";
import Modal from "../../components/modal";
import { useUserEffect } from "../../utils/use";
import { Link } from "react-router-dom";
export default function DashboardUser() {
  const user = useUserEffect();
  console.log(user);
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(!modal);
  };

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
          {user.role === "admin" ? (
            ""
          ) : (
            <Link to={"/dashboard/admin"}>
              <SettingsIcon />
            </Link>
          )}
          <Button
            txt={"Editar Perfil"}
            ariaLabel={"Editar Perfil"}
            handleUserDash={handleModalClick}
          />
        </div>
      </div>
      <div>Publicaciones creadas</div>
      <div className="bg-slate-500 rounded-lg">
        <CardPublication />
      </div>
      {modal ? <Modal onClose={handleModalClick} /> : ""}
    </section>
  );
}
