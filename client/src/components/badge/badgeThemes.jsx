import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function BadgeTheme({ icon, title, to }) {
  return (
    <Link to={to}>
      <div className="flex items-center justify-center text-center rounded-3xl m-2 p-1 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer">
        {icon ? <div>{icon}</div> : ""}
        <div className="font-semibold text-lg flex justify-center text-center">
          {title}
        </div>
      </div>
    </Link>
  );
}
