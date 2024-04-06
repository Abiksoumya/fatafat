import { useMutation } from "@tanstack/react-query";
import { declareResult } from "../services/user";
import { ResultFormData } from "../component/result";
import { useState } from "react";

export function useDeclareResult() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (payload: ResultFormData) => {
      return declareResult(payload);
    },
    onSuccess: (data:any) => {
      setIsSuccess(true);
    },
   
    onError: (error) => {
      setIsSuccess(false);
    },
  })

  const mutate = (data: ResultFormData) =>{
    setIsSuccess(false);
    mutation.mutate(data);
  };
  return {...mutation,isSuccess, mutate}
  
}
