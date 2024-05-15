import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section className="w-full md:w-[600px] md:pl-40 md:ml-36 md:mx-0 lg:w-[820px] lg:mx-auto mx-auto">
      <div className="hidden md:flex">
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
