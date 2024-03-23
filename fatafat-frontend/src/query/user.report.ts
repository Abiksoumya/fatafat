import { useQuery } from "@tanstack/react-query";
import { getReport } from "../services/user";

export function useAllUsersReport() {
  return useQuery({
    queryKey: ["all-report"],
    queryFn: () => {
      return getReport();
    },
  });
}