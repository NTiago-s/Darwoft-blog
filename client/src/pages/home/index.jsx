// import CardPublication from "../../components/cardPublication";
import CreatePublication from "../../components/createPublication";
import SecondCardPublication from "../../components/secondCardPublication";

export default function Home() {
  return (
    <section>
      <div>
        {/* <div>todos o seguidos</div> */}
        <div>
          <CreatePublication />
        </div>
        <div>
          <SecondCardPublication />
        </div>
      </div>
    </section>
  );
}
