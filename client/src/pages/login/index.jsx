import { useForm } from "react-hook-form";
import { validatePassword, validateEmail } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeSlash } from "../../components/icons/icons";
import { Link } from "react-router-dom";
import Button from "../../components/reutilizable/Button";
import { authService } from "../../services/Auth.service";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const info = {
            email: res.data.email,
            verified_email: res.data.verified_email,
            name: res.data.name,
            given_name: res.data.given_name,
            family_name: res.data.family_name,
            picture: res.data.picture,
          };
          localStorage.setItem("profileData", JSON.stringify(info));
          setProfile(res.data);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await authService.login(data);
      if ((user && user.role === "client") || (user && user.role === "admin")) {
        navigate("/");
        window.location.reload();
      } else if (user && user.role === "admin") {
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        confirmButtonColor: "#FF22FF",
        color: "#FFF",
        background: "#000",
        iconColor: "#FF22FF",
      });
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
      <div className="flex flex-col justify-center items-center max-w-[500px] h-auto mx-auto mt-10 bg-fondo2 p-6 sm:p-12 rounded-t-lg shadow-md">
        <button
          aria-label="Iniciar con Google"
          className="rounded-full px-6 py-3 bg-white text-black text-sm font-medium flex items-center gap-x-2"
          onClick={() => login()}
        >
          <img
            src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
            className="size-4"
            alt="Logo Google"
          />
          <span>Iniciar sesión con Google</span>
        </button>
        <p className="text-xl text-white mt-28 lg:mt-40 absolute">O</p>
      </div>
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
        <Button txt="Iniciar Sesión" ariaLabel="Iniciar Sesión" />
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
