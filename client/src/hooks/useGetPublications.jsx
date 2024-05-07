import { useCallback, useState } from "react";
import { http } from "../services/http";

export const usePublications = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);
    try {
      const publications = await http.get("publications");
      setData(publications);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  }, [setData, setIsLoading]);

  return { data, error, isLoading, get };
};