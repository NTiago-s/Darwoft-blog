/* eslint-disable react/prop-types */
import { CloseIcon } from "../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletetheme } from "../../store/httpThemesSlice";

export default function BadgeTheme({ icon, title, id, selected, onClick }) {
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();

  const handleDeleteTheme = async () => {
    try {
      dispatch(deletetheme(id));
    } catch (error) {
      console.error("Error al eliminar la temática:", error);
    }
  };

  return (
    <div
      className={`${
        selected ? "selected" : ""
      } flex items-center justify-between text-center rounded-3xl m-2 p-1 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  cursor-pointer`}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      <div className="font-semibold text-lg ml-7 flex justify-center text-center">
        {title}
      </div>
      {user && user.role === "admin" && (
        <button onClick={handleDeleteTheme}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
