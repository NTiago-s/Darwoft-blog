import { useState } from "react";
import Button from "../../components/buttons";
import { http } from "../../services/http";
import { useUserEffect } from "../../utils/use";

export default function DashboardUserAdmin() {
  const user = useUserEffect();

  const [newTheme, setNewTheme] = useState("");
  const [description, setDescription] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const handleCreateTheme = async () => {
    try {
      const response = await http.post("themes/create", {
        name: newTheme,
        description: description,
      });
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al crear la temática:", error);
    }
  };

  const handleSearchUser = async () => {
    try {
      const response = await http.post("users/search", { name: searchUser });
      console.log(response);
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
    }
  };

  return (
    <section className="w-full px-72">
      <div className="m-auto flex py-4 px-40 justify-center">
        <div className="flex gap-4">
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
        <input
          type="text"
          className="w-full border-2 p-2 mt-4 rounded-lg placeholder:text-black"
          placeholder="Ingresa una descripcion si crees que es necesario"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-4 w-full flex justify-end">
          <Button
            txt={"Crear Tematica"}
            ariaLabel={"Crear Tematica"}
            handleUserDash={handleCreateTheme}
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
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <div className="mt-4 w-full flex justify-end">
          <Button
            txt={"Buscar Usuario"}
            ariaLabel={"Buscar Usuario"}
            handleUserDash={handleSearchUser}
          />
        </div>
      </form>
    </section>
  );
}
