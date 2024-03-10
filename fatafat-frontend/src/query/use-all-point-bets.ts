import { useQuery } from "@tanstack/react-query";
import { getAllPointBets } from "../services/transaction";

export function useAllPointBets() {
  return useQuery({
    queryKey: ["all-point-bets"],
    queryFn: () => {
      return getAllPointBets();
    },
  });
}
