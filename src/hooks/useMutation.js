import axios from "axios";
import { useState } from "react";

const useMutation = (onSuccessFunc) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (url = "", payload = {}, httpMethod = "post") => {
    setIsPending(true);
    setIsSuccess(false);
    setError(null);
    return axios[httpMethod](url, payload)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setData(data);
        setIsSuccess(true);
        onSuccessFunc(data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return { data, isPending, error, isSuccess, mutate };
};

export default useMutation;
