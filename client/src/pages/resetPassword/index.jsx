import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "../icons/icons";
import { useState } from "react";
import Button from "../reutilizable/Button";
import { validatePassword } from "../../utils/validation";
import useDispatch from "react-redux";
import { resetPassword } from "../../store/httpUserSlice";
export default function ResetPassword() {
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const dispatch = useDispatch();
  const toggleVisibilityPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangePassword = async (data) => {
    try {
      dispatch(resetPassword(data.password));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-4 items-center">
        <div>
          <ShieldCheckIcon className="w-24 h-24 text-colorSecondary" />
        </div>
        <div>
          <h3 className="mt-4 text-2xl text-white">
            Ingresa tu nueva contraseña
          </h3>
        </div>
        <form
          action=""
          className="flex flex-col items-center justify-center flex-1 gap-12 p-12"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className="relative w-full mb-[70px] text-black">
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
            {errors.password && (
              <p className="text-red-600 text-sm flex-wrap absolute mt-2 h-4 mb-5">
                {errors.password.message ? errors.password.message : ""}
              </p>
            )}
          </div>
          <Button txt={"Guardar nueva Contraseña"} />
        </form>
      </div>
    </main>
  );
}
