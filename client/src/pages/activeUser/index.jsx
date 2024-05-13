import { Link } from "react-router-dom";
export default function AuthUser() {
  return (
    <main>
      <div className="m-auto flex flex-col py-32 text-white max-h-screen justify-center text-center items-center">
        <div className="w-full flex justify-center">
          <img
            src="client\public\LogoAutenticosSinZoom.png"
            className="w-40 my-6 -ml-10"
            alt=""
          />
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
            className={`flex min-w-[105px] bg-colorSecondary justify-center items-center text-sm font-bold rounded-[20px] z-20 rounded-br-none px-2 py-[8px]
                        sm:min-w-[70px] lg:px-6 lg:py-[10px]`}
          >
            haga click aqui
          </button>
        </Link>
      </div>
    </main>
  );
}
