import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";

export default function Home() {
  return (
    <section>
      <div>
        <div>todos o seguidos</div>
        <div>
          <CreatePublication />
        </div>
        <div className="bg-slate-500 rounded-lg">
          <CardPublication />
        </div>
      </div>
    </section>
  );
}
