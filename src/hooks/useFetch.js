import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetch = (url, page = "", limit = "", isEnabled = true) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    async (search = "") => {
      setIsPending(true);
      setIsSuccess(false);
      setError(null);
      axios
        .get(
          `${url}?${page && `page=${page}&`}${limit && `limit=${limit}&`}${
            search && `search=${search}&`
          }`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setIsSuccess(true);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.response.data);
        })
        .finally(() => {
          setIsPending(false);
        });
    },
    [limit, page, url]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, setData, isPending, error, fetch, isSuccess };
};

export default useFetch;
