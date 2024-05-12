/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "../../components/buttons";
import { createTheme } from "../../store/httpThemesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  adminEdit,
  fetchProfileUsers,
  searchUsers,
} from "../../store/httpUserSlice";
import { useUsers } from "../../hooks/useGetUsers";

export default function DashboardUserAdmin() {
  const user = useSelector((state) => state.user.userProfile);
  const { users } = useSelector((state) => state.user.allUsers);
  const { getAllUsers } = useUsers();
  const [newTheme, setNewTheme] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    dispatch(fetchProfileUsers());
  }, [dispatch]);

  const handleCreateTheme = async () => {
    try {
      const data = {
        name: newTheme,
      };
      dispatch(createTheme(data));
      setNewTheme("");
    } catch (error) {
      console.error("Error al crear la temática:", error);
    }
  };

  const handleSearchUser = async () => {
    try {
      dispatch(searchUsers(searchUser));
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const updatedUserData = { userId, role: newRole };
      dispatch(adminEdit(updatedUserData));
      getAllUsers();
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };

  const handleChangeStatus = async (userId, newStatus) => {
    try {
      const updatedUserData = { userId, status: newStatus };
      dispatch(adminEdit(updatedUserData));
      getAllUsers();
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  return (
    <section className="w-full lg:px-72">
      <div className="m-auto flex py-4 justify-center">
        <div className="flex gap-4">
          <div className="w-10 rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
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
          <div className="text-center flex items-center">
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </div>
        </div>
      </div>
      <div>Crear Tematicas</div>
      <form
        className="rounded-lg my-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="w-full border-2 p-2 rounded-lg placeholder:text-black"
          placeholder="Ingresa la nueva tematica a crear"
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
        />
        <div className="mt-4 w-full flex justify-end">
          <Button
            txt={"Crear Tematica"}
            ariaLabel={"Crear Tematica"}
            handleUserDash={(e) => {
              e.preventDefault();
              handleCreateTheme();
            }}
          />
        </div>
      </form>
      <div className="mt-10">Administrar Usuarios</div>
      <form className="rounded-lg my-2">
        <input
          type="text"
          className="w-full border-2 p-2 rounded-lg placeholder:text-black"
          placeholder="Ingresa el nombre del usuario a buscar"
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
            handleSearchUser();
          }}
        />
        <div className="mt-4 w-full flex justify-end">
          <Button
            txt={"Buscar Usuario"}
            ariaLabel={"Buscar Usuario"}
            handleUserDash={(e) => {
              e.preventDefault();
              handleSearchUser();
            }}
          />
        </div>
      </form>
      <div>
        {users?.map((currentUser, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-slate-800 rounded-xl my-2 p-6 text-white gap-5"
            >
              <div className="flex gap-2">
                <h3>Nombre:</h3>
                <div>{currentUser.firstName}</div>
                <div>{currentUser.lastName}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div>Email: {currentUser.email}</div>
                <div>Rol: {currentUser.role}</div>
                <div>Estado: {currentUser.status}</div>
              </div>
              {user._id === currentUser._id ? (
                <h3 className="text-green-400 font-semibold">
                  No puedes modificar tus propios datos de rol y estado
                </h3>
              ) : (
                <div className="flex gap-3">
                  {currentUser.role === "admin" ? (
                    <Button
                      txt={"Hacer Cliente"}
                      ariaLabel={"Hacer Cliente"}
                      handleUserDash={(e) => {
                        e.preventDefault();
                        handleChangeRole(currentUser._id, "client");
                      }}
                    />
                  ) : (
                    <Button
                      txt={"Hacer Admin"}
                      ariaLabel={"Hacer Admin"}
                      handleUserDash={(e) => {
                        e.preventDefault();
                        handleChangeRole(currentUser._id, "admin");
                      }}
                    />
                  )}
                  {currentUser.status === "active" ? (
                    <Button
                      txt={"Banear Usuario"}
                      ariaLabel={"Banear Usuario"}
                      handleUserDash={(e) => {
                        e.preventDefault();
                        handleChangeStatus(currentUser._id, "banned");
                      }}
                    />
                  ) : (
                    <Button
                      txt={"Activar Usuario"}
                      ariaLabel={"Activar Usuario"}
                      handleUserDash={(e) => {
                        e.preventDefault();
                        handleChangeStatus(currentUser._id, "active");
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
