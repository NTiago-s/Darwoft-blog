import { useCallback, useState } from "react";
import { http } from "../services/http";

export const usePublications = (url) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);
    try {
      const publications = await http.get(
        url ? `publications/${url}` : "publications"
      );
      setData(publications);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  }, [url, setData, setIsLoading]);

  return { data, error, isLoading, get };
};
