import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section className="w-full md:w-[600px] md:pl-40 sm:w-[700px] md:ml-36 md:mx-0 mx-auto">
      <div className="hidden sm:flex">
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
