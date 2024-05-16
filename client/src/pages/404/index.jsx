import Badge from "../../components/badge";
import { Home } from "../../components/icons/icons";

export default function Error404() {
  return (
    <header
      id="inicio"
      className="bg-black w-full min-h-screen left-0 sm:h-96 flex justify-center sm:justify-evenly items-center"
    >
      <div className="absolute top-40">
        <Badge icon={<Home />} title={"Inicio"} to={"/"} classname="!w-full" />
      </div>
      <div className="flex flex-col items-center gap-6 mb-40 sm:mb-0">
        <h2 className="text-white text-5xl font-bold text-center">
          404 Not Found
        </h2>
        <p className="text-white/70 font-semibold text-center">
          La url solicitada no existe
        </p>
      </div>
    </header>
  );
}
