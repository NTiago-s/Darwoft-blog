export default function CreatePublication() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="h-auto p-3 max-w-[700px]">
      <div className="flex justify-between m-2 gap-2">
        <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
          {`${user?.data?.firstName?.charAt(0)}${user?.data?.lastName?.charAt(
            0
          )}`}
        </div>
        <textarea
          name=""
          id=""
          cols="10"
          rows="10"
          className="rounded-xl w-full min-h-14 max-h-32
           text-2xl placeholder:text-2xl p-2"
          placeholder="¡Creá una Publicación!"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button className="flex items-center rounded-3xl p-2 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer">
          Crear Publicacion
        </button>
      </div>
    </div>
  );
}
