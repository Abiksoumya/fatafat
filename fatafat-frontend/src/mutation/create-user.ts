import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateUserInputs } from "../component/forms/create-user-form";
import { createNewUser } from "../services/user";

export function useCreateUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: CreateUserInputs) => {
      return createNewUser(payload);
    },
    onSuccess: (data) => {
      navigate("/admin/", { state: data });
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
}
