import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";
import NavBar from "../../components/navBar";
import SearchBar from "../../components/searchBar";

export default function Home() {
  return (
    <section className="flex justify-between h-screen w-screen py-6 px-10">
      <div>
        <NavBar />
      </div>
      <div>
        <div>todos o seguidos</div>
        <div>
          <CreatePublication />
        </div>
        <div className="bg-slate-500 rounded-lg">
          <CardPublication />
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </section>
  );
}
