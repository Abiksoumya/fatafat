import { useMutation } from "@tanstack/react-query";
import { declareResult } from "../services/user";
import { useNavigate } from "react-router-dom";
import { ResultFormData } from "../component/result";

export function useDeclareResult() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ResultFormData) => {
      return declareResult(payload);
    },
    onSuccess: (data) => {
      navigate("/admin/all-users", { state: data });
    },
    onError: (data) => {
      navigate("/admin/all-users", { state: data });
    },
  });
}
