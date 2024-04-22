import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validatePassword, validateEmail } from "../../utils/validation";
import { Eye, EyeSlash } from "../../components/icons/icons";
export default function Login() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const toggleVisibilityPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };

  return (
    <div className="my-40">
      <form className="flex flex-col justify-center items-center max-w-[500px] h-auto mx-auto bg-fondo2 p-6 sm:p-12 rounded-b-lg shadow-md">
        <div className="flex flex-col w-full">
          <input
            type="email"
            placeholder="Email"
            className={`h-14 w-full px-2 placeholder:text-primary-blue placeholder:px-1  text-primary-blue  bg-white  border border-primary-blue-20 mt-10 mb-16  rounded-t-md`}
            {...register("email", {
              required: "Ingresa un Email",
              validate: validateEmail,
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm flex-wrap absolute mt-[105px] h-4 mb-5">
              {errors.email.message ? errors.email.message : ""}
            </p>
          )}
        </div>
        <div className="relative w-full mb-[70px] text-black">
          <div>
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
            <p className="text-red-600 text-sm flex-wrap absolute mt-2 h-4 mb-5">
              {errors.password.message ? errors.password.message : ""}
            </p>
          )}
        </div>
        <button>Iniciar Sesion</button>
        <div className="flex flex-col mt-9 gap-2 items-center justify-between text-txt">
          <span className="hover:underline text-primary-blue font-Montserrat font-semibold text-md transition-colors cursor-pointer">
            ¿Olvidaste la contraseña?
          </span>

          <p className="mt-4 flex items-center">
            ¿No tienes cuenta?
            <Link
              to={"/register"}
              aria-label="Registrarse"
              className="hover:underline pl-1 transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
