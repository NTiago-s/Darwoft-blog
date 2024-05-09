import Swal from "sweetalert2";

export default function Alert(
  title,
  text,
  icon,
  confirmButtonColor,
  color,
  background,
  iconColor
) {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor,
    color,
    background,
    iconColor,
  });
}
