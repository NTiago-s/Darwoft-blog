/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "../hooks/useGetUsers";
import { useThemes } from "../hooks/useGetThemes";
import { usePublications } from "../hooks/useGetPublications";
export const useUserEffect = () => {
  const userData = useUser();
  useEffect(() => {
    userData.get();
  }, []);
  return userData;
};

export const useThemesEffect = () => {
  const themesData = useThemes();
  useEffect(() => {
    themesData.get();
  }, []);
  return themesData;
};

export const usePublicationsEffect = () => {
  const publicationsData = usePublications();
  useEffect(() => {
    publicationsData.get();
  }, []);
  return publicationsData;
};

export const usePublicationsFilterEffect = () => {
  const publicationsData = usePublications("filter");
  useEffect(() => {
    publicationsData.get();
  }, []);
  return publicationsData;
};
