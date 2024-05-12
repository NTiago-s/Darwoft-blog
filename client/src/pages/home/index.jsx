import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section className="w-full lg:px-72">
      <div className="hidden sm:flex">
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
