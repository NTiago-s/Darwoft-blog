import { useEffect } from "react";
import { useUser } from "../hooks/useGetUsers";

export const useUserEffect = () => {
  const userData = useUser();
  useEffect(() => {
    userData.get();
  }, []);
  return userData;
};
