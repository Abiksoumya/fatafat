import { useMutation } from "@tanstack/react-query";
import { transferPoint } from "../services/user";
import { TransferPointFormData } from "../component/forms/transfer-point-form";
import { useNavigate } from "react-router-dom";

export function useTransferPoint() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: TransferPointFormData) => {
      return transferPoint(payload);
    },
    onSuccess: (data) => {
      navigate("/admin/all-transactions", { state: data });
    },
    onError: (data) => {
      navigate("/admin/all-transactions", { state: data });
    },
  });
}
