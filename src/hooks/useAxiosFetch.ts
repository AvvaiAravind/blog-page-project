import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { PostType } from "../components/App";

const useAxiosFetch = (
  dataUrl: string
): {
  data: PostType[];
  fetchError: any;
  isLoading: boolean;
} => {
  const [data, setData] = useState<PostType[]>([]);
  const [fetchError, setFetchError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url: string): Promise<void> => {
      setIsLoading(true);
      try {
        if (isMounted) {
          const response = await axios.get(url, {
            signal: controller.signal,
          });
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof AxiosError && error.response) {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setFetchError(error);
          } else if (error instanceof Error) {
            console.log("Error", error.message);
            setFetchError(error);
          }
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    const cleanup = () => {
      isMounted = false;
      controller.abort();
    };
    return cleanup;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
