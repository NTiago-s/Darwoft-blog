import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { http } from "../../services/http";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function FormUserEdit() {
  const { register, handleSubmit, setValue } = useForm();
  const user = useSelector((state) => state.user.userProfile);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("telUser", user.telUser);
    }
  }, [user, setValue]);

  //! react-lazy-load-image-component para las imagenes

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("telUser", data.telUser);
      formData.append("image", image);

      const response = await http.put("users", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Usuario creado correctamente!",
          text: "Revisa tu correo para verificar tu cuenta",
          icon: "success",
          confirmButtonColor: "#22C55e",
          color: "#FFF",
          background: "#000",
          iconColor: "#22C55e",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al modificar el usuario:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form
      className="flex flex-col gap-2 "
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <label
        htmlFor="imagen"
        className="flex flex-col text-white font-semibold text-xl"
      >
        Imagen de perfil:
        <input
          type="file"
          id="imagen"
          onChange={handleImageChange}
          className="rounded-xl text-black px-3 py-1"
        />
      </label>
      <label
        htmlFor="nombre"
        className="gap-2 flex flex-col text-white font-semibold text-xl"
      >
        Nombre:
        <input
          type="text"
          id="nombre"
          className="rounded-xl text-black px-3 py-1"
          {...register("firstName")}
        />
      </label>
      <label
        htmlFor="apellido"
        className="gap-2 flex flex-col text-white font-semibold text-xl"
      >
        Apellido:
        <input
          type="text"
          id="apellido"
          className="rounded-xl text-black px-3 py-1"
          {...register("lastName")}
        />
      </label>
      <label
        htmlFor="email"
        className="gap-2 flex flex-col text-white font-semibold text-xl"
      >
        Email:
        <input
          type="email"
          id="email"
          className="rounded-xl text-black px-3 py-1"
          {...register("email")}
        />
      </label>
      <label
        htmlFor="telefono"
        className="gap-2 flex flex-col text-white font-semibold text-xl "
      >
        Telefono:
        <input
          type="text"
          id="telefono"
          className="rounded-xl text-black px-3 py-1"
          {...register("telUser")}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Guardar
      </button>
    </form>
  );
}
