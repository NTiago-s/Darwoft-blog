import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThemes } from "../store/httpThemesSlice";

export const useThemes = () => {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes);
  const isLoading = useSelector((state) => state.theme.isLoading);
  const error = useSelector((state) => state.theme.error);

  const getThemes = useCallback(async () => {
    dispatch(fetchThemes());
  }, [dispatch]);

  return { themes, isLoading, error, getThemes };
};
