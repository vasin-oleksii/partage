import { useState, useEffect } from "react";

export const usePut = (url: string, body: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const putData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log(result);

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    putData();
  }, [url]);

  return { isLoading };
};
