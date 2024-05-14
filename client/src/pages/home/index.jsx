import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section className="w-full sm:w-[700px] md:w-[600px] md:pl-40 md:ml-36 md:mx-0 lg:w-[900px] lg:mx-auto mx-auto">
      <div className="hidden sm:flex">
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
