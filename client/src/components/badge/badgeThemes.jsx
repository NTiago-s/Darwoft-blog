/* eslint-disable react/prop-types */
import { CloseIcon } from "../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletetheme } from "../../store/httpThemesSlice";

export default function BadgeTheme({ icon, title, id, selected, onClick }) {
  const user = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();

  const handleDeleteTheme = async (e) => {
    e.stopPropagation();
    try {
      dispatch(deletetheme(id));
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <div
      className={`${
        selected ? "selected" : ""
      } flex items-center justify-between text-center rounded-3xl py-1 px-3 gap-2 bg-blue-100 text-blue-800 hover:bg-emerald-300 hover:text-black text-sm font-medium dark:bg-blue-900 dark:text-blue-300  w-full cursor-pointer`}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      <div className="font-semibold text-lg ml-4 flex justify-center text-center">
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
