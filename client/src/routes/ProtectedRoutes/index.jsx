import { Navigate, useOutlet } from "react-router-dom";
import { authService } from "../../services/Auth.service";

export const ProtectedLayout = () => {
  const user = authService.isAuthorized();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{outlet}</>;
};
