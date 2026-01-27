import { useEffect, useState, useRef, useCallback } from "react";

const useAxios = (apifun) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);
  const execute = useCallback(() => {
    if (typeof apifun !== "function") {
      return;
    }
    setLoading(true);
    setError(null);
    const promise = apifun();
    if (!promise || typeof promise.then !== "function") {
      setLoading(false);
      return;
    }
    promise
      .then((res) => {
        if (isMounted.current) {
          setData(res?.data ?? null);
        }
      })
      .catch((e) => {
        if (isMounted.current) setError(e);
      })
      .finally(() => {
        if (isMounted.current) {
          setLoading(false);
        }
      });
  }, [apifun]);
  useEffect(() => {
    isMounted.current = true; // reset for this run
    execute();
    return () => {
      isMounted.current = false; // cleanup on unmount
    };
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useAxios;
