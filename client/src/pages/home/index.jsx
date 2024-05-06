import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";
// import SecondCardPublication from "../../components/secondCardPublication";

export default function Home() {
  return (
    <section className="w-full px-72">
      <div>
        <CreatePublication />
      </div>
      <div>
        <CardPublication />
      </div>
    </section>
  );
}
