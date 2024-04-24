import { Search } from "../icons/icons";

export default function SearchBar() {
  return (
    <div className="flex gap-3 min-h-10">
      <div>
        <input type="text" className="border-2 rounded-xl h-auto" />
      </div>
      <div>
        <button className="border-2 h-auto">
          <Search />
        </button>
      </div>
    </div>
  );
}
