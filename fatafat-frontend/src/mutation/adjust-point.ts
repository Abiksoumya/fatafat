import { useMutation } from "@tanstack/react-query";
import { adjustPoint } from "../services/user";
import { AdjustPointFormData } from "../component/forms/adjust-point-form";
import { useNavigate } from "react-router-dom";

export function useAdjustPoint() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: AdjustPointFormData) => {
      return adjustPoint(payload);
    },
    onSuccess: (data) => {
      navigate("/result", { state: data });
    },
    onError: (data) => {
      navigate("/result", { state: data });
    },
  });
}
