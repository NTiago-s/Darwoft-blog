import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileUsers, fetchUsers } from "../store/httpUserSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const getUsers = useCallback(async () => {
    dispatch(fetchProfileUsers());
  }, [dispatch]);

  const getAllUsers = useCallback(async () => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { users, isLoading, error, getUsers, getAllUsers };
};
