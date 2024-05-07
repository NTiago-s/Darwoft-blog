import { useForm } from "react-hook-form";
import { useUserEffect } from "../../utils/use";
import { useEffect } from "react";
import { http } from "../../services/http";

export default function FormUserEdit() {
  const { register, handleSubmit, setValue } = useForm();
  const user = useUserEffect();

  useEffect(() => {
    if (user?.data) {
      setValue("firstName", user.data.firstName);
      setValue("lastName", user.data.lastName);
      setValue("email", user.data.email);
      setValue("telUser", user.data.telUser);
    }
  }, [user?.data, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await http.put("users", data);
    console.log(response);
  };

  return (
    <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
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
