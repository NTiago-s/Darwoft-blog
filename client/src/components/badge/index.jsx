import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Badge({ icon, title, to, click, classname }) {
  return (
    <Link to={to}>
      <div
        onClick={click}
        className={`flex items-center
        rounded-3xl p-2 gap-1 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black dark:bg-blue-900 dark:text-blue-300 cursor-pointer ${classname}`}
      >
        {icon ? <div>{icon}</div> : ""}
        <div className="text-lg">{title}</div>
      </div>
    </Link>
  );
}
