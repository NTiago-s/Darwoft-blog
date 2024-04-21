export default function Home() {
  return (
    <section className="flex justify-evenly px-20 h-screen w-screen border-2">
      <div className="border-2">navBar</div>
      <div className="border-2">
        <div className="border-2 p-6">todos o seguidos</div>
        <div className="border-2 p-10">para postear</div>
        <div className="border-2">mostrar publicaciones</div>
      </div>
      <div className="border-2">
        searchBar maybe para buscar publicaciones por tematica
      </div>
    </section>
  );
}
