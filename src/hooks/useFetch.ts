import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueFromServer, setValueFromServer] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const result = await response.json();

      setValueFromServer(result);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = () => {
    fetchData();
  };

  return { isLoading, data: valueFromServer, reFetch };
};
