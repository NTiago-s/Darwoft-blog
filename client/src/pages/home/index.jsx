import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section className="w-full sm:w-[700px] mx-auto">
      <div className="hidden sm:flex">
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
