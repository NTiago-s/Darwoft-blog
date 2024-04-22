import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  validateNombre,
  validatePassword,
  validateEmail,
  validateApellido,
  validatePhone,
} from "../../utils/validation";
import { Eye, EyeSlash } from "../../components/icons/icons";

export default function Register() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const toggleVisibilityPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };
  return (
    <form className="flex flex-col max-w-[500px] bg-fondo2 sm:p-12 shadow-md rounded-md p-6 h-auto mx-auto my-40">
      <div className="flex flex-col lg:flex-row w-full gap-x-4">
        <div className="flex flex-col">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className={`h-14 w-full px-2 placeholder:text-primary-blue placeholder:px-1 text-primary-blue  bg-white border border-primary-blue-20 mb-14 sm:mb-10  rounded-t-md`}
              {...register("firstName", {
                required: "",
                validate: validateNombre,
              })}
            />
            {errors.firstName && (
              <p className=" text-red-600 text-sm absolute h-12 sm:-mt-9 md:-my-9 -mt-12 w-[190px] ">
                {errors.firstName.message ? errors.firstName.message : ""}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Apellido"
            className={`h-14 w-full px-2 placeholder:text-primary-blue placeholder:px-1 text-primary-blue  bg-white border border-primary-blue-20 mb-14  rounded-t-md`}
            {...register("lastName", {
              required: "",
              validate: validateApellido,
            })}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm absolute h-12 mt-[62px] w-[190px] ">
              {errors.lastName.message ? errors.lastName.message : ""}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="Prefijo & Telefono"
          className={`h-14 w-full placeholder:text-primary-blue  pl-3 pr-2  text-primary-blue  bg-white border border-primary-blue-20 mb-14 sm:mb-10  rounded-t-md`}
          {...register("telUser", {
            required: "Ingresa un Telefono",
            validate: validatePhone,
          })}
        />
        {errors.telUser && (
          <p className="text-red-600 text-sm absolute h-12 sm:-mt-9 md:-mt-9 -mt-12 w-[190px] ">
            {errors.telUser.message ? errors.telUser.message : ""}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className={`h-14 w-full px-2 placeholder:text-primary-blue placeholder:px-1  text-primary-blue  bg-white  border border-primary-blue-20 mb-14 mt-2 rounded-t-md`}
          {...register("email", {
            required: "Ingresa un Email",
            validate: validateEmail,
          })}
          aria-label="Email Input"
        />
        {errors.email && (
          <p
            className="text-red-600 text-sm absolute -mt-12 h-6 "
            aria-live="assertive"
          >
            {errors.email.message
              ? errors.email.message
              : "Por favor, ingresa un email válido."}
          </p>
        )}
      </div>
      <div className="relative w-full mb-4">
        <label htmlFor="password" className="sr-only">
          Contraseña
        </label>
        <div className="">
          <input
            type={`${visibilityPassword ? "text" : "password"}`}
            id="password"
            placeholder="Contraseña"
            className={`w-full h-14 pl-2 pr-10 placeholder:text-primary-blue placeholder:px-1 text-primary-blue bg-white border border-primary-blue-20 rounded-t-md`}
            {...register("password", {
              required: "Ingresa una Contraseña",
              validate: validatePassword,
            })}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-2 flex items-center cursor-pointer"
            onClick={toggleVisibilityPassword}
          >
            {visibilityPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        {errors.password && (
          <p className="absolute text-red-600 text-sm h-4 mt-1 max-w-[380px]">
            {errors.password.message ? errors.password.message : ""}
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center w-full text-white mt-9 ">
        <button>Registrarse</button>
        <p className="mt-9">
          ¿Ya tienes una cuenta?
          <Link
            to={"/login"}
            aria-label="¿Ya tienes una cuenta?"
            className="hover:underline pl-1 transition-colors"
          >
            Inicia Sesion
          </Link>
        </p>
      </div>
    </form>
  );
}
