import { useQuery } from "@tanstack/react-query";
import { getAllUsersReport } from "../services/user";

export function useAllUsersReport() {
  return useQuery({
    queryKey: ["all-users-report"],
    queryFn: () => {
      return getAllUsersReport();
    },
  });
}