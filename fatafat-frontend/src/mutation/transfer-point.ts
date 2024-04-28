import { useMutation } from "@tanstack/react-query";
import { transferPoint } from "../services/user";
import { TransferPointFormData } from "../component/forms/transfer-point-form";
import { useState } from "react";

export function useTransferPoint() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (payload: TransferPointFormData) => {
      return transferPoint(payload);
    },
    onSuccess: (data: any) => {
      setIsSuccess(true);
    },
    onError: (error) => {
      setIsSuccess(false);
    },
  });

  const mutate = (data: TransferPointFormData) => {
    setIsSuccess(false);
    mutation.mutate(data);
  };
  return { ...mutation, isSuccess, mutate };
}
