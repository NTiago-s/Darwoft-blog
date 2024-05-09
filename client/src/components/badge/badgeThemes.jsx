import { Link } from "react-router-dom";
import { CloseIcon } from "../icons/icons";
import { useUserEffect } from "../../utils/use";
import { http } from "../../services/http";

// eslint-disable-next-line react/prop-types
export default function BadgeTheme({ icon, title, to, id }) {
  const user = useUserEffect();
  const handleDeleteTheme = async () => {
    try {
      const response = await http.deleteCreates("themes/delete", id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al eliminar la temática:", error);
    }
  };

  return (
    <Link to={to}>
      <div className="flex items-center justify-between text-center rounded-3xl m-2 p-1 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer">
        {icon ? <div>{icon}</div> : ""}
        <div className="font-semibold text-lg ml-7 flex justify-center text-center">
          {title}
        </div>
        {user?.data?.role === "admin" ? (
          <button onClick={handleDeleteTheme}>
            <CloseIcon />
          </button>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
