import { useQuery } from "@tanstack/react-query";
import { getAllTransaction } from "../services/transaction";

export function useAllTransaction() {
  return useQuery({
    queryKey: ["all-transaction"],
    queryFn: () => {
      return getAllTransaction();
    },
  });
}
