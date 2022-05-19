import axios from "axios";
import { useHistory } from "react-router";
import { useAuthDispatcher } from "src/contexts/Auth";
import useMutation from "./useMutation";

export default function useLoginUser(url = "") {
  const authDispatch = useAuthDispatcher();
  const history = useHistory();

  return useMutation(async (data) => {
    authDispatch({
      type: "LOGIN",
      payload: data,
    });
    window.location.href = "/";
  });
}
