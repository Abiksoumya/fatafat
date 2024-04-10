import { useQuery } from "@tanstack/react-query";
import { getBetDetailsByDate, getReport } from "../services/user";

export function useAllUsersReport() {
  return useQuery({
    queryKey: ["all-report"],
    queryFn: () => {
      return getReport();
    },
  });
}

export function usebetDetailsByDate(date: string) {
  return useQuery({
    queryKey: ["all-bet-details"],
    queryFn: () => {
      return getBetDetailsByDate(date);
    },
  });
}
