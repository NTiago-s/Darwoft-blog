import { useState } from "react";
import Button from "../../components/buttons";
import { SettingsIcon } from "../../components/icons/icons";
import Modal from "../../components/modal";
import { useUserEffect } from "../../utils/use";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../services/http";
import CardPublication from "../../components/cardPublication";
export default function DashboardUser() {
  const user = useUserEffect();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleClick = async () => {
    const response = await http.put("auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <section className="w-full px-72">
      <div className="m-auto flex py-4 px-20 justify-between">
        <div className="flex  gap-4">
          <div className="w-10 rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
            {user ? (
              <img
                src={user?.data?.profileImage}
                alt=""
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              `${user?.data?.firstName?.charAt(
                0
              )}${user?.data?.lastName?.charAt(0)}`
            )}
          </div>
          <div className="text-center flex items-center">
            {user ? `${user?.data?.firstName} ${user?.data?.lastName}` : ""}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* {user.role === "admin" ? (
            <Link to={"/dashboard/admin"}>
              <SettingsIcon />
            </Link>
          ) : (
            ""
          )} */}
          {user.role === "admin" ? (
            ""
          ) : (
            <Link to={"/dashboard/admin"}>
              <SettingsIcon />
            </Link>
          )}
          <div className="flex flex-col gap-4">
            <Button
              txt={"Editar Perfil"}
              ariaLabel={"Editar Perfil"}
              handleUserDash={handleModalClick}
            />
            <Button
              txt={"Cerrar Sesion"}
              ariaLabel={"Cerrar Sesion"}
              handleUserDash={handleClick}
            />
          </div>
        </div>
      </div>
      <div>
        <CardPublication />
      </div>
      {modal ? <Modal onClose={handleModalClick} /> : ""}
    </section>
  );
}
