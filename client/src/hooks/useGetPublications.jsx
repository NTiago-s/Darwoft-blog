import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublications } from "../store/httpPublicationSlice";

export const usePublications = () => {
  const dispatch = useDispatch();
  const publications = useSelector((state) => state.publication.publications);
  const isLoading = useSelector((state) => state.publication.isLoading);
  const error = useSelector((state) => state.publication.error);

  const getPublications = useCallback(async () => {
    dispatch(fetchPublications());
  }, [dispatch]);

  return { publications, isLoading, error, getPublications };
};
