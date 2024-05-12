/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "../../components/buttons";
import { SettingsIcon } from "../../components/icons/icons";
import Modal from "../../components/modal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import CardPublication from "../../components/cardPublication";
import { useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useUsers } from "../../hooks/useGetUsers";
export default function DashboardUser() {
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { getUsers, getAllUsers } = useUsers();

  useEffect(() => {
    getUsers();
    getAllUsers();
  }, [getUsers, getAllUsers]);

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleClick = async () => {
    dispatch(logoutUser());
  };

  return (
    <section className="w-full">
      <div className="m-auto flex flex-col gap-4 p-4  justify-between">
        <div className="flex w-full justify-center gap-4">
          <div className="flex rounded-full size-14 justify-center items-center text-center bg-gray-900 text-white">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt=""
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`
            )}
          </div>
          <div className="flex text-center font-medium text-lg items-center">
            {user ? `${user?.firstName} ${user?.lastName}` : ""}
          </div>
          <div className="flex text-center font-medium text-lg items-center">
            {user?.role === "admin" ? (
              <Link to={"/dashboard/admin"}>
                <SettingsIcon />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-4">
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
