import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/httpUserSlice";
import InputField from "./inputField";
import { useUsers } from "../../hooks/useGetUsers";

export default function FormUserEdit() {
  const { register, handleSubmit, setValue } = useForm();
  const user = useSelector((state) => state.user.userProfile);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { getUsers } = useUsers();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("telUser", user.telUser);
    }
  }, [user, setValue]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("telUser", data.telUser);
    if (image) {
      formData.append("image", image);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    dispatch(updateUser(formData));
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl("");
    } else {
      setImage(null);
    }
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleDeleteImage = async () => {
    dispatch(updateUser({ userId: user._id, image: "" }));
    getUsers();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {user && user.profileImage ? (
        <div className="flex justify-center items-center flex-col gap-2">
          <img
            src={user.profileImage}
            alt="Imagen de perfil"
            className="rounded-full object-cover h-32 w-32"
          />
          <button
            type="button"
            onClick={handleDeleteImage}
            className="text-red-500"
          >
            Eliminar imagen de perfil
          </button>
        </div>
      ) : (
        <div>
          <InputField
            label="Selecciona un archivo"
            type="file"
            html="imagen"
            id="imagen"
            change={handleImageChange}
          />
          <div className="flex justify-center">
            <h2 className="text-white font-semibold text-xl">O</h2>
          </div>
          <InputField
            label="Link de imagen"
            type="text"
            change={handleImageUrlChange}
          />
        </div>
      )}
      <InputField
        label="Nombre:"
        type="text"
        register={register("firstName")}
        html="nombre"
        id="nombre"
      />
      <InputField
        label="Apellido:"
        type="text"
        register={register("lastName")}
        html="apellido"
        id="apellido"
      />
      <InputField
        label="Email:"
        type="email"
        register={register("email")}
        html="email"
        id="email"
      />
      <InputField
        label="Telefono:"
        type="text"
        register={register("telUser")}
        html="telefono"
        id="telefono"
      />
      <div className="flex justify-start w-full mt-6">
        <h4 className="text-white text-base hover:underline cursor-pointer ">
          Quieres modificar tu contraseña?
        </h4>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Guardar
      </button>
    </form>
  );
}
