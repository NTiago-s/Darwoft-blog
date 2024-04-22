import { Adjusment } from "../icons/icons";

export default function CardPublication() {
  return (
    <div className="h-auto p-3 max-w-[700px]">
      <div className="flex justify-between m-3">
        <div className="flex gap-2">
          <div className="rounded-full bg-gray-900 text-white min-w-14 h-14 flex justify-center items-center text-center">
            TN
          </div>
          <div className="text-center flex items-center">
            Nombre del usuario
          </div>
        </div>
        <div>
          <div className="flex h-auto w-auto justify-end p-4">
            <button>
              <Adjusment />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-auto p-2 border-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        officia fugiat illo totam expedita rerum nisi exercitationem possimus
        voluptas, dolorum mollitia neque quis. Molestiae laboriosam obcaecati,
        quisquam ullam aut corrupti! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Obcaecati harum eaque dignissimos velit pariatur ut
        et, reprehenderit, impedit quidem doloremque labore beatae sint nam
        similique recusandae, ipsam ea! Distinctio, corrupti.
      </div>
      <div className="max-h-40 flex">
        <input type="text" className="border-2 w-full rounded-lg my-2" />
      </div>
    </div>
  );
}
