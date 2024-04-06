import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateUserInputs } from "../component/forms/create-user-form";
import { createNewUser } from "../services/user";
import { useState } from "react";

export function useCreateUser() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: (payload: CreateUserInputs) => {
      return createNewUser(payload);
    },
    onSuccess: (data: any) => {
      console.log("Success data:", data);
      setIsSuccess(true); // Set success state to true
      // Optionally, navigate to another page
      // navigate("/admin/", { state: data });
    },
    onError(error) {
      console.log("Error:", error);
    },
  });

  const mutate = (data: CreateUserInputs) => {
    setIsSuccess(false); // Reset success state
    mutation.mutate(data); // Call mutate from the useMutation hook
  };

  return { ...mutation, isSuccess, mutate };
}
