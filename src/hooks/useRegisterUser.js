import axios from "axios";
import { useHistory } from "react-router";
import { useAuthDispatcher } from "src/contexts/Auth";
import useMutation from "./useMutation";

export default function useRegisterUser() {
  const history = useHistory();
  return useMutation(async (data) => {
    history.push("login");
  });
}
