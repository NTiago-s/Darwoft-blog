import { Link } from "react-router-dom";
import { ShieldIcon } from "../../components/icons/icons";
export default function AuthUser() {
  return (
    <main>
      <div className="m-auto bg-gray-100/70 flex flex-col py-32 text-black max-h-screen justify-center text-center items-center">
        <div className="w-full flex justify-center">
          <ShieldIcon />
        </div>
        <div className="text-2xl max-w-xl mt-3 mb-7">
          <p className="my-4">
            Felicidades tu cuenta fue autenticada y activada correctamente!!!
          </p>
          <p>¿Desea Iniciar Sesión?</p>
        </div>
        <Link to={"/login"}>
          <button
            aria-label="Iniciar Sesión"
            className={`flex min-w-[105px] bg-colorSecondary justify-center items-center text-sm border-2 border-black font-bold rounded-[20px]  px-2 py-[8px]
            sm:min-w-[70px] lg:px-6 lg:py-[10px]`}
          >
            Haga click aquí
          </button>
        </Link>
      </div>
    </main>
  );
}
