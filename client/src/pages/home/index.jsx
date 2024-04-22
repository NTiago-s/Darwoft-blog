import CardPublication from "../../components/cardPublication";

export default function Home() {
  return (
    <section className="flex justify-between h-screen w-screen py-6 px-10">
      <div className="">navBar</div>
      <div className="">
        <div className=" ">todos o seguidos</div>
        <div className=" ">para postear</div>
        <div className=" bg-slate-500 rounded-lg">
          <CardPublication />
        </div>
      </div>
      <div className="">
        searchBar maybe para buscar publicaciones por tematica
      </div>
    </section>
  );
}
