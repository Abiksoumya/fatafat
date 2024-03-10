import { useQuery } from "@tanstack/react-query";
import { getAllPattiBets } from "../services/transaction";

export function useAllPattiBets() {
  return useQuery({
    queryKey: ["all-patti-bets"],
    queryFn: () => {
      return getAllPattiBets();
    },
  });
}
