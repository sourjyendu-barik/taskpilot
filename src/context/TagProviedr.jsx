import { createContext, useContext, useMemo } from "react";
import useAxios from "../hooks/useAxios";
import { getTags } from "../api/Tag.api";

const TagContext = createContext();
export const useTagContext = () => useContext(TagContext);
const TagProviedr = ({ children }) => {
  const { data, loading, error, refetch: refetchTags } = useAxios(getTags);
  const tagsData = data?.data || [];
  const tags = useMemo(() => {
    if (tagsData.length === 0) {
      return [];
    }
    return tagsData;
  }, [tagsData]);
  const value = { tags, loading, error, refetchTags };
  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

export default TagProviedr;
