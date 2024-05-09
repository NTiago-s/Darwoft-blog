import { useForm } from "react-hook-form";
import { validatePassword, validateEmail } from "../../utils/validation";
import { useState } from "react";
import { Eye, EyeSlash } from "../../components/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import Button from "../../components/buttons";
import Swal from "sweetalert2";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const onSubmit = handleSubmit((data) => {
    const info = dispatch(login(data));
    console.log(info);
    if (info.payload) {
      navigate("/");
      // window.location.reload();
    }
  });

  const toggleVisibilityPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };
  const handleChangePassword = () => {
    Swal.fire({
      title: "Ingrese su correo electrónico",
      input: "email",
      inputValue: resetEmail,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#FF22FF",
      color: "#FFF",
      background: "#000",
      iconColor: "#FF22FF",
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar un correo electrónico";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            import.meta.env.VITE_ENDPOINT + "/users/prevresetpassword",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: result.value }),
            }
          );

          if (response.ok) {
            Swal.fire({
              title: "Correo electrónico enviado",
              text: `Se ha enviado un correo electrónico a ${result.value}`,
              icon: "success",
              iconColor: "#FF22FF",
              color: "#FFFFFF",
              confirmButtonColor: "#FF22FF",
              background: "#000",
            });
          } else {
            throw new Error("Error en la solicitud");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al enviar el correo electrónico. Por favor, inténtelo de nuevo más tarde.",
            icon: "error",
            iconColor: "#FF22FF",
            color: "#FFFFFF",
            confirmButtonColor: "#FF22FF",
            background: "#000",
          });
        }
      }
      setResetEmail("");
    });
  };

  return (
    <div className="my-40">
      <form
        className="flex flex-col justify-center items-center max-w-[500px] h-auto mx-auto bg-fondo2 p-6 sm:p-12 rounded-b-lg shadow-md"
        onSubmit={onSubmit}
      >
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
        <Button
          txt={loading ? "Cargando..." : "Iniciar Sesión"}
          ariaLabel="Iniciar Sesión"
          disabled={loading}
        />

        <div className="flex flex-col mt-9 gap-2 items-center justify-between text-txt">
          <span
            onClick={handleChangePassword}
            className="hover:underline text-primary-blue font-Montserrat font-semibold text-md transition-colors cursor-pointer"
          >
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
