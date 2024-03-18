import { useMutation } from "@tanstack/react-query";
import { LoginPayload, loginUser } from "../services/user";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      return loginUser(payload);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/admin");
    },
    onError(error) {
      navigate("/result", { state: error });
      console.log("On Error Called");
    },
  });
}
